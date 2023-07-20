using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AC_Service_API.Models
{
    public class ReviewModel
    {
        [Key] 
        public int Id { get; set; }   
        public string review { get; set; }
        public int rating { get; set; }
        public string servicecentermailid { get; set; }
    }
}