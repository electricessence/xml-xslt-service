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
        [Route("{example}")]
        public Task<FileStreamResult> TransformExamples(
            string example)
        {           
            return example.Trim().ToLower().EndsWith(".xml")
                ? Transform(
                    $"/Examples/{example}",
                    null)
                : Transform(
                    $"/Examples/{example}.xml",
                    $"/Examples/{example}.xsl");
        }
    }
}
