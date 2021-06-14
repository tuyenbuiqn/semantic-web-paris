using System.Web;
using System.Web.Optimization;

namespace Website
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));



            //
            bundles.Add(new ScriptBundle("~/bundles/CommonScript").Include(
                "~/Scripts/jquery-3.3.1.js",
                "~/Scripts/moment/moment.js",
                "~/Scripts/moment/moment-with-locales.js",
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/fontawesome-markers.js",
                "~/Scripts/kartik-v-bootstrap-fileinput-da964b7/js/fileinput.min.js",
                "~/Scripts/kartik-v-bootstrap-fileinput-da964b7/js/locales/vi.js",
                "~/Scripts/bootstrap-select.min.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/PluginScript").Include(
                "~/Scripts/select2/select2.js",
                "~/Scripts/select2/select2.multi-checkboxes.js",
                "~/Scripts/bootstrap-paginator.js",
                "~/Scripts/bootstrap-datetimepicker.js",
                "~/Scripts/formValidation/bootstrapValidator.js",
                "~/Scripts/sortable/sortable.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/DoTScript").Include(
                "~/Scripts/DOTCommonConstant.js",
                "~/Scripts/DOTCommonScript.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/tmpl").Include(
                "~/Scripts/tmpl/jquery.tmpl.js",
                "~/Scripts/tmpl/jquery.tmplPlus.js"
            ));


            bundles.Add(new ScriptBundle("~/bundles/GmapContextMenu").Include(
                "~/Scripts/gmap-context-menu/gmap-contextmenu.js",
                "~/Scripts/gmap-context-menu/gm-contextmenu.js"
            ));


            bundles.Add(new StyleBundle("~/bundles/CommonStyle").Include(
                "~/Content/normalize.css",
                "~/Content/bootstrap.css",
                "~/Content/bootstrap-theme.css",
                "~/Content/bootstrap-datetimepicker.css",
                "~/Content/select2/select2.css",
                "~/Content/font-awesome-4.7.0/css/font-awesome.min.css",
                "~/Scripts/kartik-v-bootstrap-fileinput-da964b7/css/fileinput-rtl.min.css",
                "~/Scripts/kartik-v-bootstrap-fileinput-da964b7/css/fileinput.min.css",
                "~/Content/bootstrap-select.min.css"
            ));

            bundles.Add(new StyleBundle("~/bundles/DoTStyle").Include(
                "~/Content/Layout.css",
                "~/Content/Style.css",
                "~/Content/theme.css"
            ));

            
        }
    }
}
