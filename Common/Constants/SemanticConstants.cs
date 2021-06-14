using System.ComponentModel;
using Common.Extensions;

namespace Common.Constants
{
    public class SemanticConstants
    {
        public const string BaseUri = "http://localhost:7200/repositories/graphdb1";
        public const string UserNameGraphDb = "admin";
        public const string PasswordGraphDb = "admin";

        public const string Lyon = "LYON";
    }

    public enum SelectTypeEnum
    {
        [Description("MAPPED")]
        Mapped,
        [Description("UNMAPPED")]
        UnMapped
    }
    public enum MediaTypeEnum
    {
        [Description("Video")]
        [Sort(1)]
        Video = 1,

        [Description("Image")]
        [Sort(2)]
        Image = 2,

        [Description("Audio")]
        [Sort(3)]
        Audio = 3,

        [Description("Khác")]
        [Sort(4)]
        Other = 4
    }
    public static class CommonConstants
    {
        public const string Success = "SUCCESS";
    }
}
