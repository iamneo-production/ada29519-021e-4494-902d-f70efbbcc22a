using Microsoft.AspNetCore.Mvc;
using dotnetapp.DataDbContext;
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Helpers;

namespace dotnetapp.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
         private readonly AcServiceDbContext _context;

        public UserController(AcServiceDbContext ac_DbContext)
        {
            _context = ac_DbContext;
        }
        [HttpPut("editAccount/{id}")]
        public async Task<IActionResult> EditAccount(int id, [FromBody] UserModel userModel)
        {
            if (userModel == null || id != userModel.Id)
            {
                return BadRequest(new
                {
                    Message = "fuckyou"
                });
            }

            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            
            if (user.MobileNumber == userModel.MobileNumber && user.UserName == userModel.UserName)
            {
                if (PasswordHasher.VerifyPassword(userModel.Password,user.Password))
                {    
                    return BadRequest(new
                    {
                        Message = "Old password cannot be the same as the new password."
                    });
                    
                }
                user.Password = PasswordHasher.HashPassword(userModel.Password);

            }
            if (user.MobileNumber != userModel.MobileNumber || user.UserName != userModel.UserName)
            {
                user.UserName = userModel.UserName;
                user.MobileNumber = userModel.MobileNumber;

            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "User details updated successfully."
            });
        }

        [HttpDelete("deleteAccount/{id}")]
        public async Task<IActionResult> deleteAccount(int id)
        {
            var user = await _context.Users.FindAsync(id);


            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();


            return Ok(new
            {
                Message = "user deleted"
            });
        }

        [HttpGet("getaccount/{id}")]
        public async Task<IActionResult> getAccount(string id)
        {
            var user = await _context.Users.Where(p => p.Email == id).ToListAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}