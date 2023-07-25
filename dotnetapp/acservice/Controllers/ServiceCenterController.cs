using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using acservice.Database;
using acservice.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace acservice.Controllers
{
    [Route("admin")]
    [ApiController]
    public class ServiceCenterController : ControllerBase
    {
        private readonly AC_ServerDbContext _context;
        public ServiceCenterController(AC_ServerDbContext ac_serverDbContext)
        {
            _context = ac_serverDbContext;

        }
        
        [HttpPost("addServiceCenter")]
        public async Task<IActionResult> addServiceCenter([FromBody] ServiceCenterModel serviceCenterModel)
        {
             if (serviceCenterModel == null)
            {
                return BadRequest();
            }
            var emailExists = await _context.Services.AnyAsync(x => x.serviceCenteramailId == serviceCenterModel.serviceCenteramailId);
            if (emailExists)
            {
                return BadRequest(new
                {
                    Message = "Email already takken try another email"
                });
            }
            var ServiceCenterExists = await _context.Services.AnyAsync(x => x.serviceCenterName == serviceCenterModel.serviceCenterName);
            if (ServiceCenterExists)
            {
                return BadRequest(new
                {
                    Message = "Service center name already takken try another service center name"
                });
            }
            var MobileExists = await _context.Services.AnyAsync(x => x.serviceCenterPhone == serviceCenterModel.serviceCenterPhone);
            if (MobileExists)
            {
                return BadRequest(new
                {
                    Message = "Mobile number already takken try another mobile number"
                });
            }
            await _context.Services.AddAsync(serviceCenterModel);
            await _context.SaveChangesAsync();



            return Created("", new
            {
                Message = "Service center added successfully"
            });

        }
        [HttpPut("editServiceCenter/{id}")]
        public async Task<IActionResult> editServiceCenter(string id, [FromBody] ServiceCenterModel serviceCenterModel)
        {
             if (serviceCenterModel == null || id != serviceCenterModel.serviceCenterID)
            {
                return BadRequest();
            }
            var emailExists = await _context.Services.AnyAsync(x => x.serviceCenteramailId == serviceCenterModel.serviceCenteramailId && x.serviceCenterID != serviceCenterModel.serviceCenterID);
            if (emailExists)
            {
                return BadRequest(new
                {
                    Message = "Email already takken try another email"
                });
            }
            var ServiceCenterExists = await _context.Services.AnyAsync(x => x.serviceCenterName == serviceCenterModel.serviceCenterName && x.serviceCenterID != serviceCenterModel.serviceCenterID);
            if (ServiceCenterExists)
            {
                return BadRequest(new
                {
                    Message = "Service center name already takken try another service center name"
                });
            }
            var MobileExists = await _context.Services.AnyAsync(x => x.serviceCenterPhone == serviceCenterModel.serviceCenterPhone && x.serviceCenterID != serviceCenterModel.serviceCenterID);
            if (MobileExists)
            {
                return BadRequest(new
                {
                    Message = "Mobile number already takken try another mobile number"
                });
            }

            var serviceCenter = await _context.Services.FindAsync(id);

            if (serviceCenter == null)
            {
                return NotFound();
            }

            serviceCenter.serviceCenterName = serviceCenterModel.serviceCenterName;
            serviceCenter.serviceCenterPhone = serviceCenterModel.serviceCenterPhone;
            serviceCenter.serviceCenterAddress = serviceCenterModel.serviceCenterAddress;
            serviceCenter.serviceCenterImageUrl = serviceCenterModel.serviceCenterImageUrl;
            serviceCenter.serviceCenteramailId = serviceCenterModel.serviceCenteramailId;
            serviceCenter.serviceCenterDescription = serviceCenterModel.serviceCenterDescription;

            _context.Services.Update(serviceCenter);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Service Center Updated successfully"
            });
        }
        [HttpDelete("deleteServiceCenter/{id}")]
        public async Task<IActionResult> deleteServiceCenter(string id)
        {
            var serviceCenter = await _context.Services.FindAsync(id);

            if (serviceCenter == null)
            {
                return NotFound();
            }

            _context.Services.Remove(serviceCenter);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Service Center Deleted successfully"
            });
        }

        [HttpGet("getservicecenter")]
        public async Task<IActionResult> viewServiceCenter()
        {
            var serviceCenter = await _context.Services.ToListAsync();

            if (serviceCenter == null)
            {
                return NotFound();
            }

            return Ok(serviceCenter);
        }
        [HttpGet("image/{id}")]
        public async Task<IActionResult> GetServiceImage(string id)
        {
            var service = await _context.Services.FirstOrDefaultAsync(s => s.serviceCenteramailId == id);

            if (service == null || string.IsNullOrEmpty(service.serviceCenterImageUrl))
            {
                return NotFound(new { Message = "No image found" });
            }

            return Ok(service);
        }







    }
}