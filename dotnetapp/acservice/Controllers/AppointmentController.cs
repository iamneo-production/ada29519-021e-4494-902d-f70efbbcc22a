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
using PdfSharpCore;
using PdfSharpCore.Pdf;
using TheArtOfDev.HtmlRenderer.PdfSharp;
using System.IO;

namespace acservice.Controllers
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
        public async Task<IActionResult> saveAppointment([FromBody] ProductModel productModel)
        {
            //var appointments = await _context.Products.ToListAsync();

            if (productModel == null)
            {
                return BadRequest();
            }
            await _context.Products.AddAsync(productModel);
            await _context.SaveChangesAsync();
            var appointments = await _context.Products.ToListAsync();
            return Ok(appointments);

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
                return Ok();
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
        [HttpPost("review")]
        public async Task<IActionResult> savereview([FromBody] ReviewModels review)
        {
            //var appointments = await _context.Products.ToListAsync();

            if (review == null)
            {
                return BadRequest();
            }
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
            var reviews = await _context.Reviews.ToListAsync();
            return Ok(reviews);
        }
        

            [HttpGet("getreview/{id}")]
            public async Task<IActionResult> getReview(string id)
            {
                var reviews = await _context.Reviews.Where(p => p.servicecentermailid == id).ToListAsync();

                if (reviews == null || reviews.Count == 0)
                {
                    return Ok(0); // Return 0 if there are no reviews
                }

                // Calculate the average rating
                double averageRating = reviews.Average(r => r.rating);

                return Ok(averageRating);
            }

        [HttpGet("generatebill/{pid}/{uid}/{sid}")]
        public async Task<IActionResult> generateBill(int pid,string uid,string sid)
        {
            var sd = await _context.Services.FirstOrDefaultAsync(s => s.serviceCenteramailId == sid);
            var pd = await _context.Products.FirstOrDefaultAsync(s => s.Id == pid);
            var ud = await _context.Users.FirstOrDefaultAsync(s => s.email == uid);
            var doc = new PdfDocument();
            string htmlcontent = "<div style='width:100%; text-align:center'>";
            htmlcontent += "<h2>Welcome to Cooling Management</h2>";
            htmlcontent += "<h2>"+sd.serviceCenterName+"</h2>";
            htmlcontent += "<img style='width:80px;height:80%' src='" + sd.serviceCenterImageUrl + "'   />";
           
            



            if (sd != null && pd != null && ud !=null)
            {
                htmlcontent += "<h2 style='text-align:right'>Invoice No:" + pd.Id + "</h2> ";
                htmlcontent += "<h2 style='text-align:right'>Invoice Date:" + pd.date + "</h2>";

                htmlcontent += "<h3 style='text-align:left>Customer : " + ud.userName + "</h3>";
                htmlcontent += "<h3 style='text-align:left>Contact : " + ud.mobileNumber + " </h3>";
                htmlcontent += "<h3 style='text-align:left>Email :" + ud.email + "</h3>";
                htmlcontent += "<h3 style='text-align:left>Contact Number :" + ud.mobileNumber + "</h3>";
                htmlcontent += "<div>";
            }



            htmlcontent += "<table style ='width:100%; border: 1px solid #000'>";
            htmlcontent += "<thead style='font-weight:bold'>";
            htmlcontent += "<tr>";
            htmlcontent += "<td style='border:1px solid #000'> Problem </td>";
            htmlcontent += "<td style='border:1px solid #000'>Price</td >";
            htmlcontent += "</tr>";
            htmlcontent += "</thead >";

            htmlcontent += "<tbody>";
            if (pd != null)
            {
                htmlcontent += "<tr>";
                htmlcontent += "<td>" + pd.problemDescription + "</td>";
                htmlcontent += "<td>$200</td>";
                htmlcontent += "</tr>";
                
            }
            htmlcontent += "</tbody>";

            htmlcontent += "</table>";
            htmlcontent += "</div>";

            htmlcontent += "<div style='text-align:right'>";
            htmlcontent += "<h1> Summary Info </h1>";
            htmlcontent += "<table style='border:1px solid #000;float:right' >";
            htmlcontent += "<tr>";
            htmlcontent += "<td style='border:1px solid #000'> Summary Total </td>";
            htmlcontent += "<td style='border:1px solid #000'> Summary Tax (10%)</td>";
            htmlcontent += "<td style='border:1px solid #000'> Summary NetTotal </td>";
            htmlcontent += "</tr>";
            if (pd != null)
            {
                htmlcontent += "<tr>";
                htmlcontent += "<td style='border: 1px solid #000'>$200 </td>";
                htmlcontent += "<td style='border: 1px solid #000'>$20</td>";
                htmlcontent += "<td style='border: 1px solid #000'>$220</td>";
                htmlcontent += "</tr>";
            }
            htmlcontent += "</table>";
            htmlcontent += "</div>";

            htmlcontent += "</div>";

            PdfGenerator.AddPdfPages(doc, htmlcontent, PageSize.A4);
            byte[]? response = null;
            using (MemoryStream ms = new MemoryStream())
            {
                doc.Save(ms);
                response = ms.ToArray();
            }
            string base64Pdf = Convert.ToBase64String(response);
            // Assuming you have a "Bill" model with a "PdfContent" field to store the PDF
            var bill = new BillModel {
                //id=pid,
                billpdf= base64Pdf 
            };
            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();

            string FileName = "Invoice_" + pid + ".pdf";
            return File(response,"application/pdf",FileName);
        }
    }
}