using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace acservice.Models
{
    public class ProductModel
    {
        [Key]
        public int Id { get; set; }
       
        
        public string productName { get; set; }
        public string productModelNo { get; set; }
        
        public string dateOfPurchase { get; set;}
        public string contactNumber { get; set;}
        public string problemDescription { get; set; }
        
        public string time { get; set; }
        public string date{ get; set;}

        public string maildid { get; set; }
        public string servicecenter { get; set; }
<<<<<<< HEAD
=======
        public string servicecentermailid { get; set; }
>>>>>>> 65f1ff9b176ea10d1839b5fc68f69c97f92469ba

    }
}
