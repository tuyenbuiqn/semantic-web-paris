using System;
using System.ComponentModel;

namespace Common.Extensions
{
    // https://blogs.msdn.microsoft.com/abhinaba/2005/10/21/c-3-0-using-extension-methods-for-enum-tostring/
    public static class ExtensionMethods
    {
        public static string ToDescription(this Enum en) //ext method
        {
            var type = en.GetType();
            var memInfo = type.GetMember(en.ToString());
            if (memInfo.Length <= 0) return en.ToString();
            var attrs = memInfo[0].GetCustomAttributes(
                typeof(DescriptionAttribute),
                false);
            return attrs.Length > 0 ? ((DescriptionAttribute)attrs[0]).Description : en.ToString();
        }

        public static string ConvertToString(this Enum value)

        {

            if (value == null)

                throw new ArgumentNullException("value");

            var type = value.GetType();

            var fieldInfo = type.GetField(Enum.GetName(type, value));

            var descriptionAttribute =

                (DescriptionAttribute)Attribute.GetCustomAttribute(

                                           fieldInfo, typeof(DescriptionAttribute));

            if (descriptionAttribute != null)

                return descriptionAttribute.Description;

            return value.ToString();

        }
    }
}
