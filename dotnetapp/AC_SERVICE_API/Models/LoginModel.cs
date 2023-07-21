using System.ComponentModel.DataAnnotations;

namespace AC_Service_API.Models
{
    public class LoginModel
    {
        [Key]
        public int id { get; set; }
        public string email { get; set; }
        public string password { get; set; }


    }
}
