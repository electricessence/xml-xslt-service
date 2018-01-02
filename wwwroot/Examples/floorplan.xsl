<?xml version="1.0"?>

<xsl:stylesheet
		version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:output
			method="html" indent="yes"
			omit-xml-declaration="yes"/>

	<xsl:template match="/">
		<html>
			<head>
				<link rel="stylesheet" type="text/css" href="floorplan.css"/>
				<script src="jquery/jquery-3.2.1.min.js"></script>
			</head>
			<body>

				<div class="container">
					<div class="meta-display">
						<h1>Floorplan</h1>
						<label>
							<input type="checkbox" id="flipEnabled"/>
							<span>Flipped</span>
						</label>

						<h2 id="room_title"></h2>
						<p id="room_desc"></p>
					</div>
					<div class="floor-plan">
						<xsl:copy-of select="."/>
					</div>
				</div>

				<div class="controls">
					<label>
						<input type="checkbox" checked="checked" id="labelsEnabled"/>
						<span>Labels</span>
					</label>
				</div>

				<script src="floorplan.js"></script>
			</body>

		</html>
	</xsl:template>

</xsl:stylesheet>

