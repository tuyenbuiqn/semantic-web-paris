using System;
using System.ComponentModel.DataAnnotations;
namespace Model.Model
{
    public class HospitalModel
    {
        public string CityName { get; set; }

        [Display(Name = "Tên bệnh viện", Prompt = "...", Order = 0)]
        [Required(ErrorMessage = "{0} Không được để trống")]
        [StringLength(maximumLength: 200, MinimumLength = 2, ErrorMessage = "{0} cần có độ dài từ {2} đến {1} ký tự")]
        [MaxLength(200, ErrorMessage = "{0} quá dài")]
        public string HospitalName { get; set; }

        [Display(Name = "Chuyên khoa", Prompt = "Đa khoa, RHM, TMH...", Order = 0)]
        [Required(ErrorMessage = "{0} Không được để trống")]
        [StringLength(maximumLength: 200, MinimumLength = 2, ErrorMessage = "{0} cần có độ dài từ {2} đến {1} ký tự")]
        [MaxLength(200, ErrorMessage = "{0} quá dài")]
        public string MedicalSpecialty { get; set; }


        [Display(Name = "Địa chỉ", Prompt = "Địa chỉ đầy đủ", Order = 2)]
        [Required(ErrorMessage = "{0} Không được để trống")]
        [StringLength(maximumLength: 200, MinimumLength = 2, ErrorMessage = "{0} cần có độ dài từ {2} đến {1} ký tự")]
        [MaxLength(200, ErrorMessage = "{0} quá dài")]
        public string Address { get; set; }

        [Display(Name = "Điện thoại", Prompt = "Điện thoại", Order = 4)]
        [StringLength(maximumLength: 200, MinimumLength = 0, ErrorMessage = "{0} cần có độ dài từ {2} đến {1} ký tự")]
        [MaxLength(200, ErrorMessage = "{0} quá dài")]
        public string Telephone { get; set; }

        [Display(Name = "Fax", Prompt = "Fax", Order = 4)]
        [StringLength(maximumLength: 200, MinimumLength = 0, ErrorMessage = "{0} cần có độ dài từ {2} đến {1} ký tự")]
        [MaxLength(200, ErrorMessage = "{0} quá dài")]
        public string FaxNumber { get; set; }

        public string P2541 { get; set; } = "Centres Hospitaliers";
        public string AddressLocality { get; set; }

        [Display(Name = "Latitude", Prompt = "Latitude", Order = 10)]
        [Required(ErrorMessage = "{0} Không được để trống")]
        public Decimal Lat { get; set; }

        [Display(Name = "Longitude", Prompt = "Longitude", Order = 12)]
        [Required(ErrorMessage = "{0} Không được để trống")]
        public Decimal Lng { get; set; }

        public string Commune { get; set; }
        [Display(Name = "BranchCode", Prompt = "", Order = 14)]
        public string BranchCode { get; set; }
        [Display(Name = "City Wikipedia", Prompt = "", Order = 16)]
        public string Wikipedia { get; set; }
    }
}
