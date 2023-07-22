using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AC_SERVICE_API.Models
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

    }
}
