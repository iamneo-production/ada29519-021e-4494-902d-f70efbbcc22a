using Microsoft.AspNetCore.Mvc;
using AC_SERVICE_API.Database;
using AC_SERVICE_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AC_SERVICE_API.Helpers;

namespace AC_SERVICE_API.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
         private readonly AC_ServerDbContext _context;

        public UserController(AC_ServerDbContext ac_DbContext)
        {
            _context = ac_DbContext;
        }

        [HttpGet("getaccount/{id}")]
        public async Task<IActionResult> getAccount(string id)
        {
            var user = await _context.Users.Where(p => p.email == id).ToListAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}