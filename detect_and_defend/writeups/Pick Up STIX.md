Pick Up STIX Writeup
===================
## Category
Detect and Defend

## Question
During a change window late on the 2nd August 2015, Enterprise Cloud Wellness Initiative server administrator Jeremy Amadio discovered malware on the DHCP server that was making suspicious network connections. It eventuated this was part of the recent theft of ECWI corporate secrets. ECWI would like to share information of this compromise to improve the cloud wellness of enterprises. Create a STIX http://stixproject.github.io/ formatted file capturing the Who, What and when details of the incident. See https://stixproject.github.io/documentation/idioms/simple-incident/

## Designed Solution
Players parse the information contained in the question and generate a STIX format XML file using the Incident Essentials idiom.

## Hints Given
None

## Player Solution Comments
Teams generally submitted the correct information for this question. Teams most commonly lost points for invalid XML/STIX. Many lost points for missing the reporter or the Impact assessment.

## Writeup
Use the following templates to create the XML files
* https://stixproject.github.io/documentation/idioms/simple-incident/

To ensure valid XML, use stix-validator.py
* https://github.com/STIXProject/stix-validator

To get full points for this question the following information in the STIX file was required.
* Title :  a title just needs to be descriptive.
* Incident Discovery (Time) : the date of the change window needs to reflected in the Incident_Discovery. Date is important, time is not)
* Reporter : ECWI staff name is included
* Impact assessment : Data breach or compromise should be named as the type (from the STIX vocab) since this is related to exfiltration.

```XML
<stix:STIX_Package
	xmlns:cybox="http://cybox.mitre.org/cybox-2"
	xmlns:cyboxCommon="http://cybox.mitre.org/common-2"
	xmlns:cyboxVocabs="http://cybox.mitre.org/default_vocabularies-2"
	xmlns:example="http://example.com"
	xmlns:incident="http://stix.mitre.org/Incident-1"
	xmlns:stix="http://stix.mitre.org/stix-1"
	xmlns:stixCommon="http://stix.mitre.org/common-1"
	xmlns:stixVocabs="http://stix.mitre.org/default_vocabularies-1"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="example:Package-64d8887a-943f-4171-a83c-4c135e767b5f" version="1.2">
   <stix:Incidents>
       <stix:Incident id="example:incident-86ac40e2-5af9-47db-b698-5119caa4af92" timestamp="2015-09-27T14:43:37.918000+00:00" xsi:type='incident:IncidentType'>
           <incident:Title>Server Malware at ECWI</incident:Title>
           <incident:Time>
               <incident:Initial_Compromise precision="second">1980-01-01T00:00:00</incident:Initial_Compromise>
               <incident:Incident_Discovery precision="second">2015-08-02T00:00:00</incident:Incident_Discovery>
               <incident:Restoration_Achieved precision="second">2015-08-02T00:00:00</incident:Restoration_Achieved>
               <incident:Incident_Reported precision="second">2015-08-02T00:00:00</incident:Incident_Reported>
           </incident:Time>
           <incident:Description>Malware discovery</incident:Description>
           <incident:Reporter>
               <stixCommon:Description>Jeremy Amadio</stixCommon:Description>
               <stixCommon:Identity>
                   <stixCommon:Name>ECWI</stixCommon:Name>
               </stixCommon:Identity>
               <stixCommon:Time>
                   <cyboxCommon:Produced_Time>2014-03-11T00:00:00</cyboxCommon:Produced_Time>
               </stixCommon:Time>
           </incident:Reporter>
           <incident:Victim>
               <stixCommon:Name>ECWI</stixCommon:Name>
           </incident:Victim>
           <incident:Impact_Assessment>
               <incident:Effects>
                   <incident:Effect xsi:type="stixVocabs:IncidentEffectVocab-1.0">Data Breach or Compromise</incident:Effect>
               </incident:Effects>
           </incident:Impact_Assessment>
           <incident:Confidence timestamp="2015-09-27T14:43:37.919000+00:00">
               <stixCommon:Value xsi:type="stixVocabs:HighMediumLowVocab-1.0">High</stixCommon:Value>
           </incident:Confidence>
       </stix:Incident>
   </stix:Incidents>
</stix:STIX_Package>
```
