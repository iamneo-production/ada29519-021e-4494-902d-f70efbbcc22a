using System.ComponentModel.DataAnnotations;

namespace AC_SERVICE_API.Models
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
