using Microsoft.AspNetCore.Mvc;
using WebApp.DataDbContext;
using WebApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Helpers;

namespace WebApp.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
         private readonly AcServiceDbContext _context;

        public UserController(AcServiceDbContext ac_DbContext)
        {
            _context = ac_DbContext;
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