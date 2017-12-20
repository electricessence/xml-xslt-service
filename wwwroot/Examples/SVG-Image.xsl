<?xml version="1.0"?>

<xsl:stylesheet
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output
        method="xml" indent="yes"
		omit-xml-declaration="yes"
		media-type="image/svg+xml" />

	<xsl:template match="/">
		<svg xmlns="http://www.w3.org/2000/svg">
			<rect x="0" y="0" width="720" height="720" fill="red" />
		</svg>
	</xsl:template>

</xsl:stylesheet>
