using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace acservice.Models
{
    public class LoginModel
    {
        [Key]
        public int id { get; set; }
        public string email { get; set; }
        public string password { get; set; }


    }
}
