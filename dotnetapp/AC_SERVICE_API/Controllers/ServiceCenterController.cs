using AC_Service_API.Database;
using AC_Service_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace AC_Service_API.Controllers
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
            await _context.Services.AddAsync(serviceCenterModel);
            await _context.SaveChangesAsync();
           

  
            return Ok(new
            {
                Message = "Service center added"
            });

        }

        [HttpPut("editServiceCenter/{id}")]
        public async Task<IActionResult> editServiceCenter(string id, [FromBody] ServiceCenterModel serviceCenterModel)
        {
            if (serviceCenterModel == null || id != serviceCenterModel.serviceCenterID)
            {
                return BadRequest();
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
                Message = "Service center updated"
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
                Message = "Service center deleted"
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







    }
}
