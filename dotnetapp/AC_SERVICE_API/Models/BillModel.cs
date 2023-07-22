using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AC_SERVICE_API.Models
{
    public class BillModel
    {
       
        [Key]
        public int id { get; set; }
        public string billpdf { get; set; }
    }
}