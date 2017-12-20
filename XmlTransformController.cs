using System;
using System.IO;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using System.Xml.Xsl;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace xml_xslt_service
{
    [Route("transform")]
    public partial class XmlTransformController
    {
        IHostingEnvironment _env;
        public XmlTransformController(IHostingEnvironment env)
        {
            _env = env;
        }

        protected Task<Stream> GetStream(string pathOrUri)
        {
            if (pathOrUri == null)
                throw new ArgumentNullException("pathOrUri");
            if (string.IsNullOrWhiteSpace(pathOrUri))
                throw new ArgumentException("Must provide a valid value.", "pathOrUri");

            var templateInfo = _env.WebRootFileProvider.GetFileInfo(pathOrUri);
            if (templateInfo.Exists)
                return Task.FromResult(templateInfo.CreateReadStream());

            return new HttpClient().GetStreamAsync(pathOrUri);
        }

        protected void UseXmlReader(string pathOrUri, Action<XmlReader> handler)
        {
            var templateInfo = _env.WebRootFileProvider.GetFileInfo(pathOrUri);
            if (templateInfo.Exists)
            {
                using (var stream = templateInfo.CreateReadStream())
                using (var reader = XmlReader.Create(stream))
                {
                    handler(reader);
                }
            }
            else
            {
                using (var reader = XmlReader.Create(pathOrUri))
                {
                    handler(reader);
                }
            }
        }

        protected async Task UseXmlReader(string pathOrUri, Func<XmlReader, Task> handler)
        {
            var templateInfo = _env.WebRootFileProvider.GetFileInfo(pathOrUri);
            if (templateInfo.Exists)
            {
                using (var stream = templateInfo.CreateReadStream())
                using (var reader = XmlReader.Create(stream, new XmlReaderSettings{ Async = true }))
                {
                    await handler(reader);
                }
            }
            else
            {
                using (var reader = XmlReader.Create(pathOrUri, new XmlReaderSettings{ Async = true }))
                {
                    await handler(reader);
                }
            }
        }

        protected T UseXmlReader<T>(string pathOrUri, Func<XmlReader, T> handler)
        {
            var templateInfo = _env.WebRootFileProvider.GetFileInfo(pathOrUri);
            if (templateInfo.Exists)
            {
                using (var stream = templateInfo.CreateReadStream())
                using (var reader = XmlReader.Create(stream))
                {
                    return handler(reader);
                }
            }
            else
            {
                using (var reader = XmlReader.Create(pathOrUri))
                {
                    return handler(reader);
                }
            }
        }

        protected async Task<T> UseXmlReader<T>(string pathOrUri, Func<XmlReader, Task<T>> handler)
        {
            var templateInfo = _env.WebRootFileProvider.GetFileInfo(pathOrUri);
            if (templateInfo.Exists)
            {
                using (var stream = templateInfo.CreateReadStream())
                using (var reader = XmlReader.Create(stream, new XmlReaderSettings{ Async = true }))
                {
                    return await handler(reader);
                }
            }
            else
            {
                using (var reader = XmlReader.Create(pathOrUri, new XmlReaderSettings{ Async = true }))
                {
                    return await handler(reader);
                }
            }
        }

        protected static string GetXslOutputMediaType(XDocument xsl)
        {
            var nav = xsl.CreateNavigator();
            var xpath = nav.Compile("/*/xsl:output/@media-type");
            var namespaceManager = new XmlNamespaceManager(nav.NameTable);
            namespaceManager.AddNamespace("xsl", "http://www.w3.org/1999/XSL/Transform");
            xpath.SetContext(namespaceManager);

            foreach (var node in nav.Select(xpath))
                return node.ToString();

            return null;

        }
    }
}
