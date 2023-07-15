using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace acservice.Models
{
    public class BillModel
    {
        
        public int id { get; set; }
        public string billpdf { get; set; }
    }
}