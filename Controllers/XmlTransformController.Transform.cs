using System;
using System.IO;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace xml_xslt_service
{
    public partial class XmlTransformController
    {

        async Task<ActionResult> Transform(
            Stream outputStream,
            string template)
        {
            string type = null;
            if (!string.IsNullOrWhiteSpace(template))
            {
                var transform = new XslCompiledTransform();
                var xdoc = await UseXmlReader(template,
                    r => XDocument.LoadAsync(r, new LoadOptions{}, new CancellationTokenSource().Token));

                using(var r = xdoc.CreateReader())
                    transform.Load(r);

                type = GetXslOutputMediaType(xdoc)
                    ?? SupportedContentTypes.Translate(transform.OutputSettings.OutputMethod);

                using (var readStream = outputStream)
                {
                    outputStream = new MemoryStream();

                    var xmlReader = XmlReader.Create(readStream);
                    var xmlWriter = XmlWriter.Create(outputStream, transform.OutputSettings);
                    transform.Transform(xmlReader, xmlWriter);
                    outputStream.Position = 0;
                }
            }

            return new FileStreamResult(
                outputStream,
                type ?? "text/plain"
            );
        }

        public async Task<ActionResult> Transform(
            string source,
            string template)
        {
            return await Transform(await GetStream(source), template);
        }

        // POST api/values
        [HttpPost]
        public Task<ActionResult> Post(
            [FromBody] string xml,
            [FromQuery] string template,
            [FromQuery] string type)
        {
            var stream = new MemoryStream();
            using(var writer = new StreamWriter(stream))
            {
                writer.Write(xml);
                writer.Flush();
            }
            stream.Position = 0;

            return Transform(stream, template);
        }
    }
}
