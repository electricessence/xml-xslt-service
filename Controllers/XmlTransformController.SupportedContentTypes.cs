using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Xsl;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace xml_xslt_service
{
    public partial class XmlTransformController
    {
        public static class SupportedContentTypes
        {
            public const string TEXT = "text/plain";
            public const string XML = "text/xml";
            public const string HTML = "text/html";
            public const string SVG = "image/svg+xml";

            public static string Translate(string type)
            {
                if(!string.IsNullOrWhiteSpace(type))
                {
                    switch(type.ToLowerInvariant())
                    {
                        case "text":
                            return TEXT;
                        case "xml":
                            return XML;
                        case "html":
                            return HTML;
                        case "svg":
                            return SVG;
                    }

                }
                
                return type;               
            }

            public static string Translate(XmlOutputMethod type)
            {
                switch(type)
                {
                    case XmlOutputMethod.Text:
                        return TEXT;
                    case XmlOutputMethod.Xml:
                        return XML;
                    case XmlOutputMethod.Html:
                        return HTML;
                }
                return null;
            }

        }
    }
}
