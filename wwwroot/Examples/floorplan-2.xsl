<?xml version="1.0"?>

<xsl:stylesheet
		version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
		xmlns="http://www.w3.org/2000/svg">

	<xsl:output
			method="xml" indent="yes"
			omit-xml-declaration="yes"
			media-type="image/svg+xml"/>

	<xsl:template match="/">
		<svg xmlns="http://www.w3.org/2000/svg">
			<style>
				.sample {
					stroke:black;
					fill:green;
				}
				.wall {
					stroke:black;
					fill:#DDD;
				}
			</style>

			<g>
				<!-- walls -->
				<xsl:apply-templates mode="walls" />
			</g>
		</svg>
	</xsl:template>

	<xsl:template mode="walls" match="wall">
		<rect class="wall" x="{@x}" y="{@y}" width="{@w}" height="{@t}">
			<xsl:if test="@r">
				<xsl:attribute name="transform">rotate(<xsl:value-of select="@r"/> 100 100)</xsl:attribute>
			</xsl:if>
		</rect>
	</xsl:template>

</xsl:stylesheet>
