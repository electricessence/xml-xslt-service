<?xml version="1.0"?>
<xsl:stylesheet
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output
        method="html"
		omit-xml-declaration="yes"
        indent="yes"/>

	<xsl:template match="/">
		<html>
			<body>
    			<xsl:apply-templates />
			</body>
		</html>
	</xsl:template>

	<xsl:template match="person">
		<div>
            <xsl:apply-templates />
        </div>
	</xsl:template>

	<xsl:template match="name">
        <span><xsl:value-of select="first" /></span>
        <xsl:text> </xsl:text>
        <span><xsl:value-of select="last" /></span>
	</xsl:template>

</xsl:stylesheet>