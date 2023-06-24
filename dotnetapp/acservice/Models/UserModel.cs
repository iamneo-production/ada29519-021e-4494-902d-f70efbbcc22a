
namespace acservice.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string userRole { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string password { get; set; }

        public string confirmpassword { get; set; }
        public string mobileNumber { get; set; }
    }
}
