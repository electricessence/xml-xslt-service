using System;
using System.Diagnostics;
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
		public async Task<ActionResult> TransformExamples(
			string example)
		{
			try
			{
				return example.Trim().ToLower().EndsWith(".xml")
					? await Transform(
						$"/Examples/{example}",
						null)
					: await Transform(
						$"/Examples/{example}.xml",
						$"/Examples/{example}.xsl");
			}
			catch (InvalidOperationException)
			{
				return new NotFoundResult();
			}
		}
	}
}
