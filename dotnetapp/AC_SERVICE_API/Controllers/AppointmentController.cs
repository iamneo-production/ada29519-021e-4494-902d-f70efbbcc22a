using AC_Service_API.Database;
using AC_Service_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace AC_Service_API.Controllers
{
    [Route("user")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AC_ServerDbContext _context;
        public AppointmentController(AC_ServerDbContext dbcontext)
        {
            _context = dbcontext;
        }
       
        
        [HttpPost("appointment")]
public async Task<IActionResult> SaveAppointment([FromBody] ProductModel productModel)
{
    try
    {
        if (productModel == null)
        {
            return BadRequest("Invalid product data");
        }
        
        await _context.Products.AddAsync(productModel);
        await _context.SaveChangesAsync();

        var appointments = await _context.Products.ToListAsync();
        return Ok(appointments);
    }
    catch (Exception ex)
    {
        return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while saving the appointment.");
    }
}

        [HttpDelete("cancelappointment/{id}")]
        public async Task<IActionResult> deleteAppointment(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(id);
        }
        [HttpPut("editappointment/{id}")]
        public async Task<IActionResult> EditAppointment(int id, [FromBody] ProductModel productModel)
        {
            if (productModel == null || id != productModel.Id)
            {
                return BadRequest();
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            product.productName = productModel.productName;
            product.productModelNo = productModel.productModelNo;
            product.dateOfPurchase = productModel.dateOfPurchase;
            product.contactNumber = productModel.contactNumber;
            product.problemDescription = productModel.problemDescription;
            product.date = productModel.date;
            product.time = productModel.time;


            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }
        
        [HttpGet("appointments/{id}")]
        public async Task<IActionResult> getAppointment(string id)
        {
            var appointments = await _context.Products.Where(p => p.maildid == id).ToListAsync();

            if (appointments == null || appointments.Count == 0)
            {
                return NotFound(new
                {
                    Message = "No appointments found"
                });
            }

            return Ok(appointments);
        }
        [HttpGet("appointments")]
        public async Task<IActionResult> getAppointment()
        {
            var appointments = await _context.Products.ToListAsync();

            if (appointments == null || appointments.Count == 0)
            {
                return NotFound(new
                {
                    Message = "No appointments found"
                });
            }

            return Ok(appointments);
        }








    }
}