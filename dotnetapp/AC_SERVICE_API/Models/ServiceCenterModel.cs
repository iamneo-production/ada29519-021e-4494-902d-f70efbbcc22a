using System.ComponentModel.DataAnnotations;

namespace AC_Service_API.Models
{
    public class ServiceCenterModel
    {
        [Key]
        public string serviceCenterID { get; set; }
        public string serviceCenterName { get; set; }
        public string serviceCenterPhone { get; set; }
        public string serviceCenterAddress { get; set; }
        public string serviceCenterImageUrl { get; set; }
        public string serviceCenteramailId { get; set; }
        public string serviceCenterDescription { get; set; }
    }
}
