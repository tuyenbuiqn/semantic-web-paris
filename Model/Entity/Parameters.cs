using System.Collections.Generic;

namespace Model.Entity
{
    public class Parameters
    {
        public List<string> Dataset { get; set; }
        public string Timezone { get; set; }
        public int Rows { get; set; }
        public int Start { get; set; }
        public string Format { get; set; }
    }
}