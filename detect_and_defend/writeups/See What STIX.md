See What STIX Writeup
===================
## Category
Detect and Defend

## Question
As part of your further investigation, you have been provided with a copy of the malware that was recovered by Jeremy Amadio on the DHCP server. ECWI would like to share information relating to this malware to improve the cloud wellness of enterprises. [foundmalware.exe](../files/foundmalware.exe.extension). Create a STIX (http://stixproject.github.io/) formatted file capturing malicious urls and the hash details of the malware recovered from the DHCP server. We suggest dynamic analysis to recover urls. See https://stixproject.github.io/documentation/idioms/malware-hash/ and https://stixproject.github.io/documentation/idioms/malicious-url/

## Designed Solution
Players analyse the provided malware and generate two STIX format XML files; one using the 'Malware Indicator for File Hash idiom and one using the 'Indicator for Malicious URL' idiom.

## Hints Given
None

## Player Solution Comments
Teams generally submitted the correct information for this question. Teams most commonly lost points for submitting invalid XML/STIX. Many lost points for omitting the file hashes or the malicious url.

## Writeup
Use the following templates to create the XML files
* https://stixproject.github.io/documentation/idioms/malware-hash/
* https://stixproject.github.io/documentation/idioms/malicious-url/

To ensure valid XML, use stix-validator.py
* https://github.com/STIXProject/stix-validator

To get full points for this question the following information in the STIX file was required.

Key information from malware analysis to captured in malicious url XML
* Title :  a title just needs to be descriptive
* URI Object : JErVbLhBC81BizgG.maliciousperson.cysca

Key information from malware analysis to captured in malware hash XML
* Title :  a title just needs to be descriptive
* FileObj Hash : both SHA1 and MD5 should be listed with correct type

**Example Malicious URL STIX XML**
```xml
<stix:STIX_Package xmlns:cyboxCommon="http://cybox.mitre.org/common-2" xmlns:cybox="http://cybox.mitre.org/cybox-2" xmlns:cyboxVocabs="http://cybox.mitre.org/default_vocabularies-2" xmlns:URIObj="http://cybox.mitre.org/objects#URIObject-2" xmlns:example="http://example.com" xmlns:indicator="http://stix.mitre.org/Indicator-2" xmlns:stixCommon="http://stix.mitre.org/common-1" xmlns:stixVocabs="http://stix.mitre.org/default_vocabularies-1" xmlns:stix="http://stix.mitre.org/stix-1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation=" http://cybox.mitre.org/common-2 http://cybox.mitre.org/XMLSchema/common/2.1/cybox_common.xsd http://cybox.mitre.org/cybox-2 http://cybox.mitre.org/XMLSchema/core/2.1/cybox_core.xsd http://cybox.mitre.org/default_vocabularies-2 http://cybox.mitre.org/XMLSchema/default_vocabularies/2.1/cybox_default_vocabularies.xsd http://cybox.mitre.org/objects#URIObject-2 http://cybox.mitre.org/XMLSchema/objects/URI/2.1/URI_Object.xsd http://stix.mitre.org/Indicator-2 http://stix.mitre.org/XMLSchema/indicator/2.2/indicator.xsd http://stix.mitre.org/common-1 http://stix.mitre.org/XMLSchema/common/1.2/stix_common.xsd http://stix.mitre.org/default_vocabularies-1 http://stix.mitre.org/XMLSchema/default_vocabularies/1.2.0/stix_default_vocabularies.xsd http://stix.mitre.org/stix-1 http://stix.mitre.org/XMLSchema/core/1.2/stix_core.xsd" id="example:Package-8fab937e-b694-11e3-b71c-0800271e87d2" version="1.2">
<stix:Indicators>
<stix:Indicator id="example:Indicator-d81f86b9-975b-bc0b-775e-810c5ad45a4f" xsi:type='indicator:IndicatorType'>
    <indicator:Title>Malware callback site</indicator:Title>
    <indicator:Type xsi:type="stixVocabs:IndicatorTypeVocab-1.0">URL Watchlist</indicator:Type>
    <indicator:Observable id="example:Observable-ee59c28e-d922-480e-9b7b-a79502696505">
        <cybox:Object id="example:URI-b13ae3fc-80af-49c2-9de9-f713abc070ba">
            <cybox:Properties xsi:type="URIObj:URIObjectType" type="URL">
                <URIObj:Value condition="Equals">JErVbLhBC81BizgG.maliciousperson.cysca</URIObj:Value>
            </cybox:Properties>
        </cybox:Object>
   </indicator:Observable>
</stix:Indicator>
</stix:Indicators>
</stix:STIX_Package>
```

**Example malware analysis STIX XML**
```xml
<stix:STIX_Package xmlns:cyboxCommon="http://cybox.mitre.org/common-2" xmlns:cybox="http://cybox.mitre.org/cybox-2" xmlns:cyboxVocabs="http://cybox.mitre.org/default_vocabularies-2" xmlns:FileObj="http://cybox.mitre.org/objects#FileObject-2" xmlns:example="http://example.com" xmlns:indicator="http://stix.mitre.org/Indicator-2" xmlns:ttp="http://stix.mitre.org/TTP-1" xmlns:stixCommon="http://stix.mitre.org/common-1" xmlns:stixVocabs="http://stix.mitre.org/default_vocabularies-1" xmlns:stix="http://stix.mitre.org/stix-1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation=" http://cybox.mitre.org/common-2 http://cybox.mitre.org/XMLSchema/common/2.1/cybox_common.xsd http://cybox.mitre.org/cybox-2 http://cybox.mitre.org/XMLSchema/core/2.1/cybox_core.xsd http://cybox.mitre.org/default_vocabularies-2 http://cybox.mitre.org/XMLSchema/default_vocabularies/2.1/cybox_default_vocabularies.xsd http://cybox.mitre.org/objects#FileObject-2 http://cybox.mitre.org/XMLSchema/objects/File/2.1/File_Object.xsd http://stix.mitre.org/Indicator-2 http://stix.mitre.org/XMLSchema/indicator/2.2/indicator.xsd http://stix.mitre.org/TTP-1 http://stix.mitre.org/XMLSchema/ttp/1.2/ttp.xsd http://stix.mitre.org/common-1 http://stix.mitre.org/XMLSchema/common/1.2/stix_common.xsd http://stix.mitre.org/default_vocabularies-1 http://stix.mitre.org/XMLSchema/default_vocabularies/1.2.0/stix_default_vocabularies.xsd http://stix.mitre.org/stix-1 http://stix.mitre.org/XMLSchema/core/1.2/stix_core.xsd" id="example:Package-fdd39a2e-b67c-11e3-bcc9-f01faf20d111" version="1.2">
<stix:Indicators>
      <stix:Indicator id="example:indicator-a932fcc6-e032-176c-126f-cb970a5a1ade" xsi:type='indicator:IndicatorType'  timestamp="2014-02-20T09:00:00.000000Z">
           <indicator:Title>File hash for ECWI Malware</indicator:Title>
           <indicator:Type xsi:type="stixVocabs:IndicatorTypeVocab-1.0">File Hash Watchlist</indicator:Type>
           <indicator:Observable id="example:Observable-7d6f87bb-b4cd-42dd-b655-72557e9ea79f">
               <cybox:Object id="example:File-91040dc2-28d8-4925-bfe8-6b50d300afe1">
                   <cybox:Properties xsi:type="FileObj:FileObjectType">
                       <FileObj:Hashes>
                           <cyboxCommon:Hash>
                               <cyboxCommon:Type xsi:type="cyboxVocabs:HashNameVocab-1.0">SHA1</cyboxCommon:Type>
                               <cyboxCommon:Simple_Hash_Value condition="Equals">6851ababb54cc4837503eb86c97e2305ab0a60f6</cyboxCommon:Simple_Hash_Value>
                           </cyboxCommon:Hash>
                           <cyboxCommon:Hash>
                               <cyboxCommon:Type xsi:type="cyboxVocabs:HashNameVocab-1.0">MD5</cyboxCommon:Type>
                               <cyboxCommon:Simple_Hash_Value condition="Equals">dd2cb2b0bb8ddd762529c948c9b5d808</cyboxCommon:Simple_Hash_Value>
                           </cyboxCommon:Hash>
                       </FileObj:Hashes>
                   </cybox:Properties>
               </cybox:Object>
           </indicator:Observable>
           <indicator:Indicated_TTP>
               <stixCommon:TTP idref="example:ttp-e610a4f1-9676-eab3-bcc6-b2768d58281a" />
           </indicator:Indicated_TTP>
       </stix:Indicator>
   </stix:Indicators>
   <stix:TTPs>
       <stix:TTP id="example:ttp-e610a4f1-9676-eab3-bcc6-b2768d58281a" xsi:type='ttp:TTPType'  timestamp="2015-08-02T23:00:00.000000Z">
           <ttp:Title>ECWI Malware</ttp:Title>
           <ttp:Behavior>
               <ttp:Malware>
                   <ttp:Malware_Instance id="example:malware-fdd60b30-b67c-11e3-b0b9-f01faf20d111">
                       <ttp:Type xsi:type="stixVocabs:MalwareTypeVocab-1.0">Remote Access Trojan</ttp:Type>
                       <ttp:Name>ECWI Malware</ttp:Name>
                   </ttp:Malware_Instance>
               </ttp:Malware>
           </ttp:Behavior>
       </stix:TTP>
   </stix:TTPs>
</stix:STIX_Package>

```
