using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ACAPI.Models
{
    public class AdminModel
    {
        [Key]
        public int Id { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string mobileNumber { get; set; }
        public string userRole { get; set; }

    }
}