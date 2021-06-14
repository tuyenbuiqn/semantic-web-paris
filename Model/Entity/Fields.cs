using System;
using System.Collections.Generic;

namespace Model.Entity
{
    public class Fields
    {
        public string Etat { get; set; }
        public DateTime Lastupdate { get; set; }
        public int Nombrevelosdisponibles { get; set; }
        public int Nombreemplacementsactuels { get; set; }
        public string Nom { get; set; }
        public int Nombreemplacementsdisponibles { get; set; }
        public string Idstation { get; set; }
        public List<double> Coordonnees { get; set; }
    }
}