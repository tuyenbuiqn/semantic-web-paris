using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;

namespace Common.Extensions
{
    public class EnumDescription : Attribute
    {
        public string Text;
        public EnumDescription(string text)
        {
            Text = text;
        }

        public static string GetDescriptionFromEnumValue(Enum value)
        {
            FieldInfo field = value.GetType().GetField(value.ToString());

            DescriptionAttribute attribute
                = Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute))
                    as DescriptionAttribute;

            return attribute == null ? value.ToString() : attribute.Description;
        }
    }
    [AttributeUsage(AttributeTargets.Field, AllowMultiple = false)]
    public class EnumOrderAttribute : Attribute
    {
        public int Order { get; set; }
    }
    public static class EnumExtenstions
    {
        public static IEnumerable<string> GetWithOrder(this Enum enumVal)
        {
            return enumVal.GetType().GetWithOrder();
        }

        public static IEnumerable<string> GetWithOrder(this Type type)
        {
            if (!type.IsEnum)
            {
                throw new ArgumentException("Type must be an enum");
            }
            // caching for result could be useful
            return type.GetFields()
                                   .Where(field => field.IsStatic)
                                   .Select(field => new
                                   {
                                       field,
                                       attribute = field.GetCustomAttribute<EnumOrderAttribute>()
                                   })
                                    .Select(fieldInfo => new
                                    {
                                        name = fieldInfo.field.Name,
                                        order = fieldInfo.attribute?.Order ?? 0
                                    })
                                   .OrderBy(field => field.order)
                                   .Select(field => field.name);
        }
    }

    /// <summary>
    /// http://www.geospecialling.com/index.php/2013/02/enum-the-simple-c-value-type-we-love-to-complicate/
    /// </summary>
    public class SortAttribute : Attribute
    {
        public int Order { get; set; }
        public SortAttribute(int order)
        {
            this.Order = order;
        }
        public static SortAttribute GetSortOrder(Enum e)
        {
            return (SortAttribute)Attribute.GetCustomAttribute(e.GetType().GetField(Enum.GetName(e.GetType(), e)), typeof(SortAttribute));
        }

        public static IEnumerable<T> SortEnum<T>() where T : struct, IComparable, IConvertible
        {
            if (!typeof(T).IsEnum)
                throw new ArgumentException("T must be an enum");
            Dictionary<int, T> orderHash = new Dictionary<int, T>();
            foreach (T value in Enum.GetValues(typeof(T)))
            {
                orderHash[SortAttribute.GetSortOrder(value as Enum).Order] = value;
            }
            return orderHash.OrderBy(pair => pair.Key).Select(pair => pair.Value);
        }
    }
}
