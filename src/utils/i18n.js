import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // fallbackLng: ["fr", "en"],
    // we init with resources
    resources: {
      // en: {
      //   translations: {
      //     //toast message
      //     "Successfull": "Successfull",
      //     // Create establishments
      //     "For which institution will the file be created?":
      //       "For which institution will the file be created?",
      //       "What establishment are you looking for the security manager?":
      //       "What establishment are you looking for the security manager?",
            
      //     "Status": "Status",
      //     "Name": "Name",
      //     "Address":"Address",
      //     "Type Classification": "Type Classification",
      //     "City": "City",
      //     "Ref.": "Ref.",
      //     "CAT Ranking": "CAT Ranking",
      //     "Streel/Avenue": "Streel/Avenue",
      //     "Existing establishment": "Existing establishment",
      //     "New Establishment": "New Establishment",
      //     "Create": "Create",
      //     "Search": "Search",
      //     // navbar, sidebars
      //     "HOMEPAGE": "HOMEPAGE",
      //     "IN PROGRESS": "IN PROGRESS",
      //     "ENDED": "ENDED",
      //     "PHONE BOOK": "PHONE BOOK",
      //     "MULTIMEDIA": "MULTIMEDIA",
      //     "TEAM MANAGMENT":"TEAM MANAGMENT",
      //     "Opening": "Opening",
      //     "Establishment": "Establishment",
      //     "Location": "Location",
      //     "Clearance": "Clearance",
      //     "Category": "Category",
      //     "Fireguard Training": "Fireguard Training",
      //     "Fire Extinguisher Training": "Fire Extinguisher Training",
      //     "Fire Awareness Training": "Fire Awareness Training",
      //     "Fire alarm Drive": "Fire alarm Drive",
      //     "Companion": "Companion",
      //     "Comments": "Comments",
      //     "Video tutorial": "Video tutorial",
      //     "Notes": "Notes",
      //     "Chat": "Chat",
      //     "Assistance": "Assistance",
      //     "Please choose": "Please choose",
      //     //opentab
      //     "Folder creation": "Folder creation",
      //     "Service": "Service",
      //     "VALIDATE": "VALIDATE",
      //     "Town Planning Documents": "Town Planning Documents",
      //     "Details Of Object": "Details Of Object",
      //     "Capture": "Capture",
      //     "Origin": "Origin",
      //     "Average": "Average",
      //     "Date": "Date",
      //     "Urban planning references": "Urban planning references",
      //     "Request Type": "Request Type",
      //     "Applicant": "Applicant",
      //     "Phone": "Phone",
      //     //checkboxesSentences
      //     "Written pieces": "Written pieces",

      //     //establishmenttab
      //     "City": "City",
      //     "State": "State",
      //     "You are about to transform a group of establishments into an establishment.The history and reference of the XX group will now be linked to this new establishment.":
      //       "You are about to transform a group of establishments into an establishment. The history and reference of the XX group will now be linked to this new establishment.",
      //     "You are about to transform an establishment into a consortium of establishments The history and reference of establishment XX will now be linked to this new group":
      //       "You are about to transform an establishment into a consortium of establishments The history and reference of establishment XX will now be linked to this new group",
      //     "You are about to change the name of an establishment or a group of establishments. The history of establishment XX and the reference will now be linked to this new name.":
      //       "You are about to change the name of an establishment or a group of establishments. The history of establishment XX and the reference will now be linked to this new name.",
      //     "General data": "General data",
      //     "Name Of Establishment Ref": "Name Of Establishment Ref",
      //     "Name Establishment": "Name Establishment",
      //     "Channel type": "Channel type",
      //     "Channel name": "Channel name",
      //     "First name": "First name",
      //     "Historical": "Historical",
      //     "Description": "Description",
      //     "Staff table": "Staff table",
      //     "Ranking": "Ranking",
      //     "Number": "Number",
      //     "Object": "Object",
      //     "Opinion": "Opinion",
      //     "Clarifications – Will appear in the report":
      //       "Clarifications – Will appear in the report",
      //     "Attachment": "Attachment",
      //     "Level": "Level",
      //     "Cell number": "Cell number",
      //     "Cell name": "Cell name",
      //     "Not accessible to the public": "Not accessible to the public",
      //     "Local at risk": "Local at risk",
      //     "Comments": "Comments",
      //     "Site (if applicable)": "Site (if applicable)",
      //     "Description presenting the establishment and the activities":
      //       "Description presenting the establishment and the activities",
      //     "Low floor of the last accessible level":
      //       "Low floor of the last accessible level",
      //     "Cell": "Cell",
      //     "Local / Space / Type of audience":
      //       "Local / Space / Type of audience",
      //     "Surface accessible to the public":
      //       "Surface accessible to the public",
      //     "Calculation rule X": "Calculation rule X",
      //     "Staff": "Staff",
      //     "Less Eight Meter": "Less Eight Meter",
      //     "More Eight Meter": "More Eight Meter",
      //     "Applicable order(s)": "Applicable order(s)",
      //     "Classification ERP TYPE": "Classification ERP TYPE",
      //     "ERP CAT ranking": "ERP CAT ranking",
      //     "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.  The box in the PRECISIONS column begins with It's about ...":
      //       "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.  The box in the PRECISIONS column begins with It's about ...",
      //     "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  It's about ...  then after a space  The unfavorable opinion is based on:...":
      //       "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  It's about ...  then after a space  The unfavorable opinion is based on:...",
      //     "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports.The box in the PRECISIONS column begins with  It's about ...  then after a space  The absence of an opinion is justified by:...":
      //       "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports.The box in the PRECISIONS column begins with  It's about ...  then after a space  The absence of an opinion is justified by:...",
      //     "Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. The box in the PRECISIONS column begins with The changes relate to...":
      //       "Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. The box in the PRECISIONS column begins with The changes relate to...",
      //     "Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions.The box in the PRECISIONS column begins with  The changes relate to... ” then after a space  The unfavorable opinion is based on:...":
      //       "Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions.The box in the PRECISIONS column begins with  The changes relate to... ” then after a space  The unfavorable opinion is based on:...",
      //     "Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The changes relate to...  then after a space  The absence of an opinion is justified by:...":
      //       "Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The changes relate to...  then after a space  The absence of an opinion is justified by:...",
      //     "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type. The box in the PRECISIONS column begins with It's about... ":
      //       "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type. The box in the PRECISIONS column begins with It's about... ",
      //     "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  It's about ...  then after a space  The unfavorable opinion is based on:...":
      //       "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  It's about ...  then after a space  The unfavorable opinion is based on:...",
      //     "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  It's about ...  then after a space  The absence of an opinion is justified by:... ":
      //       "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  It's about ...  then after a space  The absence of an opinion is justified by:... ",
      //     "Give any parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels. The box in the PRECISIONS column begins with The parts received are ...":
      //       "Give any parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels. The box in the PRECISIONS column begins with The parts received are ...",
      //     "Give the parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The parts received are... then after a space  The unfavorable opinion is based on:...":
      //       "Give the parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The parts received are... then after a space  The unfavorable opinion is based on:...",
      //     "Give the parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The parts received are... ” then after a space  The absence of an opinion is justified by:...":
      //       "Give the parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The parts received are... ” then after a space  The absence of an opinion is justified by:...",
      //     "Give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The unfavorable opinion is based on:...":
      //       "Donnez les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par :- la non-conformité des installations de désenfumage de circulation ;- l'absence de formalisation des consignes d'évacuation. La case de la colonne PRECISIONS commence par L'avis défavorable est fondé sur :...",
      //     "Give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The unfavorable opinion is based on:...":
      //       "Give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The unfavorable opinion is based on:...",
      //     "Give the motivations for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The absence of an opinion is justified by:...":
      //       "Give the motivations for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The absence of an opinion is justified by:...",
      //     "If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system The box in the PRECISIONS column begins with  The work relates to...":
      //       "If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system The box in the PRECISIONS column begins with  The work relates to...",
      //     "If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The work relates to...  then after a space  The unfavorable opinion is based on:...":
      //       "If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The work relates to...  then after a space  The unfavorable opinion is based on:...",
      //     "If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The work relates to...  then after a space  The absence of an opinion is justified by:...":
      //       "If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The work relates to...  then after a space  The absence of an opinion is justified by:...",
      //     "You may give some details on the general nature of the modifications. EX The modifications relate to the smoke extraction of the circulation of the floors »The box in the PRECISIONS column begins with  The changes relate to...":
      //       "You may give some details on the general nature of the modifications. EX The modifications relate to the smoke extraction of the circulation of the floors »The box in the PRECISIONS column begins with  The changes relate to...",
      //     "You may give some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the unfavorable opinion.EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The changes relate to... then after a space  The unfavorable opinion is based on:...":
      //       "You may give some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the unfavorable opinion.EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The changes relate to... then after a space  The unfavorable opinion is based on:...",
      //     "You may give some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the without opinion.EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The changes relate to... ” then after a space  The absence of an opinion is justified by:...":
      //       "You may give some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the without opinion.EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The changes relate to... ” then after a space  The absence of an opinion is justified by:...",
      //     "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage .The box in the PRECISIONS column begins with  The reception is on...":
      //       "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage .The box in the PRECISIONS column begins with  The reception is on...",
      //     "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The reception is on...  then after a space  The unfavorable opinion is based on:...":
      //       "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The reception is on...  then after a space  The unfavorable opinion is based on:...",
      //     "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  The reception is on... ” then after a space  The absence of an opinion is justified by:...":
      //       "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  The reception is on... ” then after a space  The absence of an opinion is justified by:...",
      //     "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage .The box in the PRECISIONS column begins with  The reception is on... ":
      //       "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage .The box in the PRECISIONS column begins with  The reception is on... ",
      //     "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations; -  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The reception is on... ” then after a space  The unfavorable opinion is based on:...":
      //       "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations; -  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The reception is on... ” then after a space  The unfavorable opinion is based on:...",
      //     "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  The reception is on...  then after a space  The absence of an opinion is justified by:...":
      //       "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  The reception is on...  then after a space  The absence of an opinion is justified by:...",
      //     "Give the new classification of the establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with  Reclassification in...":
      //       "Give the new classification of the establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with  Reclassification in...",
      //     "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  the unfavorable opinion in progress;-  inconsistencies relating to workforce declarations. The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The unfavorable opinion is based on:...":
      //       "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  the unfavorable opinion in progress;-  inconsistencies relating to workforce declarations. The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The unfavorable opinion is based on:...",
      //     "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce .The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The absence of an opinion is justified by:...":
      //       "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce .The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The absence of an opinion is justified by:...",
      //     "Give the new classification of the establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with  Reclassification in...":
      //       "Give the new classification of the establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with  Reclassification in...",
      //     "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  the unfavorable opinion in progress;-  inconsistencies relating to workforce declarations. The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The unfavorable opinion is based on:...":
      //       "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  the unfavorable opinion in progress;-  inconsistencies relating to workforce declarations. The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The unfavorable opinion is based on:...",
      //     "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce .The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The absence of an opinion is justified by:...":
      //       "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce .The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The absence of an opinion is justified by:...",
      //     "If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system. The box in the PRECISIONS column begins with  The opinion relates to ...":
      //       "If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system. The box in the PRECISIONS column begins with  The opinion relates to ...",
      //     "If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  The lack of automatic fire detection on the ground floor. The box in the PRECISIONS column begins with  The opinion relates to ...  then after a space  The unfavorable opinion is based on:...":
      //       "If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  The lack of automatic fire detection on the ground floor. The box in the PRECISIONS column begins with  The opinion relates to ...  then after a space  The unfavorable opinion is based on:...",
      //     "If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of precise plans.The box in the PRECISIONS column begins with  The opinion relates to ...  then after a space  The absence of an opinion is justified by:...":
      //       "If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of precise plans.The box in the PRECISIONS column begins with  The opinion relates to ...  then after a space  The absence of an opinion is justified by:...",
      //     "If necessary, give some details on the nature of the request and the compensatory measures validated by the commission. EX: The request relates to the structure's lack of fire stability. As a compensatory measure, a category A fire safety system is set up with generalized automatic detection. The box in the PRECISIONS column begins with  The request relates to...  then after a space  In compensatory measures...":
      //       "If necessary, give some details on the nature of the request and the compensatory measures validated by the commission. EX: The request relates to the structure's lack of fire stability. As a compensatory measure, a category A fire safety system is set up with generalized automatic detection. The box in the PRECISIONS column begins with  The request relates to...  then after a space  In compensatory measures...",
      //     "You may give some details on the nature of the request. EX: The request relates to the structure's lack of fire stability.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  Compensatory measures that do not allow the evacuation time to be reduced;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The request relates to... ” then after a space  The unfavorable opinion is based on:...":
      //       "You may give some details on the nature of the request. EX: The request relates to the structure's lack of fire stability.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  Compensatory measures that do not allow the evacuation time to be reduced;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The request relates to... ” then after a space  The unfavorable opinion is based on:...",
      //     "You may give some details on the nature of the request. EX: The request relates to the structure's lack of fire stability.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of the plans mentioned in the file .The box in the PRECISIONS column begins with  The request relates to...  then after a space  The absence of an opinion is justified by:...":
      //       "You may give some details on the nature of the request. EX: The request relates to the structure's lack of fire stability.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of the plans mentioned in the file .The box in the PRECISIONS column begins with  The request relates to...  then after a space  The absence of an opinion is justified by:...",
      //     "If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire safety system. ”The box in the PRECISIONS column begins with The formal notice relates to ...":
      //       "If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire safety system. ”The box in the PRECISIONS column begins with The formal notice relates to ...",
      //     "If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire  safety system. The box in the PRECISIONS column begins with The formal notice relates to ...":
      //       "If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire  safety system. The box in the PRECISIONS column begins with The formal notice relates to ...",

      //     "If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire safety system. ”The box in the PRECISIONS column begins with The formal notice relates to ...":
      //       "If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire safety system. ”The box in the PRECISIONS column begins with The formal notice relates to ...",
      //     "If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...":
      //       "If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...",
      //     "If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...":
      //       "If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...",
      //     "If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...":
      //       "If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...",
      //   },
      // },
      fr: {
        translations: {
          //
          "Successfull": "Réussie",
          // create establishment
          "For which institution will the file be created?":
            "Pour quel établissement le dossier va-t-il être créé ?",
            "What establishment are you looking for the security manager?":
            "De quel établissement recherchez vous le responsable de sécurité ?",
          "Status": "Statut",
          "Name": "Nom",
          "Address":"Adresse",
          "Type Classification": "Classement Type",
          "City": "Commune",
          "CAT Ranking": "Classement CAT",
          "Streel/Avenue": "Rue/Avenue",
          "Existing establishment": "Etablissement existant",
          "New Establishment": "Nouvel établissement",
          "Create": "CREER",
          "Search": "RECHERCHER",
          // navbar, sidebars
          "HOMEPAGE": "ACCUEIL",
          "IN PROGRESS": "EN COURS",
          "ENDED": "TERMINÉS",
          "PHONE BOOK": "ANNUAIRE",
          "MULTIMEDIA": "MULTIMÉDIA",
          "Opening": "Ouverture",
          "Establishment": "Etablissement",
          "TEAM MANAGMENT":"GESTION D'ÉQUIPE",
          "Location": "Implantation",
          "Clearance": "Dégagement",
          "Category": "Categorie",
          "Fireguard Training": "Entraînement",
          "Fire Extinguisher Training": "Extincteur incendie",
          "Fire Awareness Training": "Sensibilisation au feu",
          "Fire alarm Drive": "Alarme incendie",
          "Companion": "Compagnon",
          "Comments": "Commentaires",
          "Video tutorial": "Tutoriel vidéo",
          "Notes": "Remarques",
          "Chat": "Messagerie",
          "Assistance": "Assistance",
          "Please choose": "Choisissez s'il vous plaît",
          //opentab
          "Folder creation": "Création de dossier",
          "VALIDATE": "VALIDER",
          "Town Planning Documents": "Documents d’urbanisme rattachés",
          "Details Of Object": "Précisions relatives à l’objet",
          "Service": "Service",
          "Capture": "Saisie",
          "Origin": "Origine",
          "Average": "Moyen",
          "Date": "Date",
          "Urban planning references": "Références d’urbanisme",
          "Request Type": "Type de demande",
          "Applicant": "Demandeur",
          "Phone": "Numéro mobile",
          //checkboxesSentences
          "Written pieces": "Pièces écrites",
          "Application for a building permit dated ___ / ___ / ___;":
            "Demande de permis de construire en date du ___ / ___ / ___ ;",
          "Work authorization request dated ___ / ___ / ___;":
            "Demande d'autorisation de travail en date du ___ / ___ / ___ ;",
          "specific file to verify <b>the compliance of establishments </b>open to the public with the rules of\r\naccessibility and safety against fire and panic of ___ / ___ / ___;":
            "dossier spécifique pour vérifier <b>la conformité des établissements </b> recevant du public aux règles d'accessibilité et de sécurité contre l'incendie et la panique du ___ / ___ / ___ ;",
          "commitment of the client to respect the general c…elating to\r\nthe solidity of the ___ / ___ / ___;\r":
            "engagement du maître d'ouvrage à respecter les règles générales de construction, notamment celles relatives à la solidité des ___ / ___ / ___ ;",
          "safety notice dated ___ / ___ / ___;":
            "avis de sécurité du ___ / ___ / ___ ;",
          "functional specifications of the fire safety system dated ___ / ___ / ___":
            "cahier des charges fonctionnel du système de sécurité incendie en date du ___ / ___ / ___",
          "- descriptive notice of the project dated ___ / ___ / ___":
            "- notice descriptive du projet en date du ___ / ___ / ___",
          " request for exemption dated ___ / ___ / ___":
            "demande de dispense du ___ / ___ / ___",
          //graphicparts
          "Graphic parts": "Pièces graphiques",
          "Site plan dated ___ / ___ / __":
            "Plan du site en date du ___ / ___ / __",
          "ground plan dated ___ / ___ / ___":
            "plan de masse en date du ___ / ___ / ___",
          "- level plan R + ___ dated ___ / ___ / __":
            "- plan de niveau R + ___ en date du ___ / ___ / __",
          "related urban planning - level plan R + ___ dated ___ / ___ / ___":
            "urbanisme lié - plan de niveau R + ___ du ___ / ___ / ___",
          "ground floor plan ___ dated ___ / ___ / ___":
            "plan du rez-de-chaussée ___ daté du ___ / ___ / ___",
          "cutting plans dated ___ / ___ / ___":
            "plans de coupe en date du ___ / ___ / ___",
          "facade plans dated ___ / ___ / ___":
            "plans de façade en date du ___ / ___ / ___",
          "graphic representations of the project in its environment dated ___ / ___ / ___":
            "représentations graphiques du projet dans son environnement en date du ___ / ___ / ___",
          "The request concerns the complete construction of the establishment.":
            "La demande concerne la construction complète de l'établissement.",
          "level plan R + ___ dated ___ / ___ / __":
            "plan de niveau R + ___ daté du ___ / ___ / __",
          " level plan R + ___ dated ___ / ___ / __":
            "plan de niveau R + ___ daté du ___ / ___ / __",
          "- level R plan - ___ dated ___ / ___ / ___":
            "- plan de niveau R - ___ en date du ___ / ___ / ___",
          "- level plan R + ___ dated ___ / ___ / ___":
            "- plan de niveau R + ___ en date du ___ / ___ / ___",
          ///study
          "The request concerns the following works:":
            "La demande concerne les travaux suivants :",
          "The request concerns modifications to the existing project. These are as follows:":
            "La demande concerne des modifications au projet existant. Ceux-ci sont les suivants :",
          "The request concerns the following works:":
            "La demande concerne les travaux suivants :",
          "Study - works": "Etude - travaux",
          "Study - works (modification of current project)":
            "Etude - travaux (modification du projet en cours)",
          "Study - technical opinion": "Etude - avis technique",
          "Study - master plan for safety":
            "Etude - schéma directeur de sécurité",
          "Study - exceptional use of premises":
            "Etude - utilisation exceptionnelle des locaux",
          "Study - specifications for hazardous work in the presence of the public":
            "Etude - cahier des charges pour travaux dangereux en présence de public",
          "Study - request for exemption": "Etude - demande de dérogation",
          //visit
          "The visit concerns the following construction site: _______________.":
            "La visite concerne le chantier suivant : _______________.",
          "The visit concerns the whole establishment":
            "La visite concerne l'ensemble de l'établissement",
          "Visit of the worksite": "Visite du chantier",
          "Visit - open to the public": "Visite - ouvert au public",
          //establishmenttab
          "Name Of Establishment Ref": "Nom de l'établissement",
          "City": "Commune",
          "State": "État",
          "You are about to transform a group of establishments into an establishment. The history and reference of the XX group will now be linked to this new establishment.":
            "Vous êtes sur le point de transformer un groupe d'établissements en établissement. L'historique et la référence du groupe XX seront désormais liées à ce nouvel établissement.",
          "You are about to transform an establishment into a consortium of establishments The history and reference of establishment XX will now be linked to this new group":
            "Vous êtes sur le point de transformer un établissement en groupement d'établissements L'historique et la référence de l'établissement XX seront désormais liés à ce nouveau groupe",
          "You are about to change the name of an establishment or a group of establishments. The history of establishment XX and the reference will now be linked to this new name.":
            "Vous êtes sur le point de changer le nom d'un établissement ou d'un groupe deétablissements. L'historique de l'établissement XX et la référence seront désormais lié à ce nouveau nom.",
          "General data": "Données générales",
          "Name Establishment": "Nom de l'établissement",
          "Channel type": "Type voie",
          "Channel name": "Nom voie",
          "First name": "Prénom",
          "Historical": "Historique",
          "Description": "Descriptif",
          "Staff table": "Tableau des effectifs",
          "Ranking": "Classement",
          "Number": "Numero",
          "Object": "Objet",
          "Opinion": "Avis",
          "Clarifications – Will appear in the report":
            "Précisions – Apparaitra dans le rapport",
          "Attachment": "Pièce jointe",
          "Level": "Niveau",
          "Cell number": "Numéro cellule",
          "Cell name": "Nom cellule",
          "Not accessible to the public": "Non accessible au public",
          "Local at risk": "Local à risques",
          "Comments": "Commentaires",
          "Site (if applicable)": "Site (si concerné)",
          "Description presenting the establishment and the activities":
            "Descriptif présentant l’établissement et les activités",
          "Low floor of the last accessible level":
            "Plancher bas du dernier niveau accessible",
          "Cell": "Cellule",
          "Local / Space / Type of audience":
            " Local / Espace / Type de public",
          "Surface accessible to the public": " Surface accessible au public",
          "Calculation rule X": " Règle de calcul X",
          "Staff": "Personnel",
          "Less Eight Meter": "Moins de huit mètres",
          "More Eight Meter": "Plus de huit mètres",
          "Applicable order(s)": "Arrêté (s) applicable(s)",
          "Classification ERP TYPE": "Classement ERP TYPE",
          "ERP CAT ranking": "Classement ERP CAT",
          "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.  The box in the PRECISIONS column begins with It's about ...":
            "Si nécessaire, donnez quelques précisions sur la nature due l'établissement proposé. EX : Il s'agit d'un EHPAD (82 logements) dans un immeuble de type R-1+3.La case de la colonne PRECISIONS commence par It's about ...",
          "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  It's about ...  then after a space  The unfavorable opinion is based on:...":
            "Si nécessaire, donnez quelques précisions sur la nature de l'établissement proposé. EX : Il s'agit d'un EHPAD (82 logements) dans un immeuble de type R-1+3. Puis donner les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par :- la non-conformité des installations de désenfumage de circulation ;- l'absence de formalisation des consignes d'évacuation. La case de la colonne PRECISIONS commence par Il s'agit de... puis après un espace L'avis défavorable est basé sur :...",
          "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports.The box in the PRECISIONS column begins with  It's about ...  then after a space  The absence of an opinion is justified by:...":
            "Si nécessaire, donnez quelques précisions sur la nature de l'établissement proposé. EX : Il s'agit d'un EHPAD (82 logements) dans un immeuble de type R-1+3. Puis donner les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par :- la non-conformité des installations de désenfumage de circulation ;- l'absence de formalisation des consignes d'évacuation. La case de la colonne PRECISIONS commence par Il s'agit de... puis après un espace L'avis défavorable est basé sur :...",
          "Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. The box in the PRECISIONS column begins with The changes relate to...":
            "Donner éventuellement la nature générale des modifications. EX : Les modifications concernent le désenfumage de la circulation des étages. La case de la colonne PRÉCISIONS commence par Les modifications concernent...",
          "Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions.The box in the PRECISIONS column begins with  The changes relate to... ” then after a space  The unfavorable opinion is based on:...":
            "Donner éventuellement la nature générale des modifications. EX : Les modifications concernent le désenfumage de la circulation des étages. Donner ensuite les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par :- la non-conformité des installations de désenfumage des circulations ;- l'absence de formalisation des consignes d'évacuation. l'avis est basé sur :...",
          "Optionally give the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The changes relate to...  then after a space  The absence of an opinion is justified by:...":
            "Donner éventuellement la nature générale des modifications. EX : Les modifications concernent le désenfumage de la circulation des étages.Donc motiver le sans avis. EX : L'absence d'avis est motivée par la non-présentation des rapports de vérification réglementaires ». L'encadré dans la colonne PRECISIONS commence par Les modifications portent sur... puis après un espace L'absence d'avis est justifiée par :.. .",
          "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type. The box in the PRECISIONS column begins with It's about... ":
            "Si nécessaire, donnez quelques précisions sur la nature de l'établissement proposé. EX : Il s'agit d'un EHPAD (82 logements) dans un immeuble de type R-1+3. La case de la colonne PRECISIONS commence par It's about...",
          "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  It's about ...  then after a space  The unfavorable opinion is based on:...":
            "Si nécessaire, donnez quelques précisions sur la nature de l'établissement proposé. EX : Il s'agit d'un EHPAD (82 logements) dans un immeuble de type R-1+3. Puis donner les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par :- la non-conformité des installations de désenfumage de circulation ;- l'absence de formalisation des consignes d'évacuation. La case de la colonne PRECISIONS commence par Il s'agit de... puis après un espace L'avis défavorable est basé sur :...",
          "If necessary, give some details on the nature of the proposed establishment. EX: This is an EHPAD (82 accommodation) in a building of the R-1 + 3 type.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  It's about ...  then after a space  The absence of an opinion is justified by:...":
            "Si nécessaire, donnez quelques précisions sur la nature de l'établissement proposé. EX : Il s'agit d'un EHPAD (82 logements) dans un immeuble de type R-1+3.Donnez alors les raisons du sans avis. EX : L'absence d'avis est motivée par la non présentation des rapports de vérification réglementaires . La case dans la colonne PRECISIONS commence par Il s'agit de... puis après un espace L'absence d'avis est justifiée par :...",
          "Give any parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels. The box in the PRECISIONS column begins with The parts received are ...":
            "Donnez toutes les parties de l'établissement qui ont été reçues. EX : Les pièces acceptées sont le rez-de-chaussée, et les deux premiers niveaux. La case dans la colonne PRÉCISIONS commence par Les pièces reçues sont ...",
          "Give the parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The parts received are... then after a space  The unfavorable opinion is based on:...":
            "Donnez les parties de l'établissement qui ont été reçues. EX : Les pièces acceptées sont le rez-de-chaussée, et les deux premiers niveaux. Donner ensuite les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par :- la non-conformité des installations de désenfumage de circulation ;- l'absence de formalisation des consignes d'évacuation. La case de la colonne PRECISIONS commence par Les pièces reçues sont... puis après un espace L'avis défavorable est basé sur :...",
          "Give the parts of the establishment that have been received. EX: The parts accepted are the ground floor, and the first two levels.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The parts received are... ” then after a space  The absence of an opinion is justified by:...":
            "Donnez les parties de l'établissement qui ont été reçues. EX : Les pièces acceptées sont le rez-de-chaussée, et les deux premiers niveaux. Puis donner les raisons du sans avis. EX : L'absence d'avis est motivée par la non présentation des rapports de vérification réglementaires « . La case dans la colonne PRECISIONS commence par Les pièces reçues sont… » puis après un espace L'absence d'avis est justifiée par :. ..",
          "Give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The unfavorable opinion is based on:...":
            "Donnez les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par :- la non-conformité des installations de désenfumage de circulation ;- l'absence de formalisation des consignes d'évacuation. La case de la colonne PRECISIONS commence par L'avis défavorable est fondé sur :...",
          "Give the motivations for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The absence of an opinion is justified by:...":
            "Donner les motivations du sans avis. EX : L'absence d'avis est motivée par la non présentation des rapports de vérification réglementaires ». L'encadré dans la colonne PRECISIONS commence par L'absence d'avis est justifiée par :...",
          "If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system The box in the PRECISIONS column begins with  The work relates to...":
            "Au besoin, donnez quelques précisions sur la nature des travaux prévus. EX : Les travaux concernent l'agrandissement du 2e étage et le remplacement complet du système de sécurité incendie La case de la colonne PRÉCISIONS commence par Les travaux concernent...",
          "If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The work relates to...  then after a space  The unfavorable opinion is based on:...":
            "Au besoin, donnez quelques précisions sur la nature des travaux prévus. EX : Les travaux concernent l'agrandissement du 2e étage et le remplacement complet du système de sécurité incendie. Donner ensuite les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par :- la non-conformité des installations de désenfumage de circulation ;- l'absence de formalisation des consignes d'évacuation. La case de la colonne PRECISIONS commence par Le travail concerne... puis après un espace L'avis défavorable est basé sur :...",
          "If necessary, give some details on the nature of the planned work. EX: The work concerns the extension of 2e floor and complete replacement of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The work relates to...  then after a space  The absence of an opinion is justified by:...":
            "Au besoin, donnez quelques précisions sur la nature des travaux prévus. EX : Les travaux concernent l'agrandissement du 2e étage et le remplacement complet du système de sécurité incendie.Donnez ensuite les raisons du sans avis. EX : L'absence d'avis est motivée par la non présentation des rapports de vérifications réglementaires ». La case dans la colonne PRECISIONS commence par Les travaux concernent... puis après un espace L'absence d'avis est justifiée par :.. .",
          "You may give some details on the general nature of the modifications. EX The modifications relate to the smoke extraction of the circulation of the floors »The box in the PRECISIONS column begins with  The changes relate to...":
            "Vous pouvez donner quelques détails sur la nature générale des modifications. EX : Les modifications portent sur le désenfumage de la circulation des planchers » La case de la colonne PRECISIONS commence par Les modifications portent sur... » : « Vous pouvez donner quelques détails sur la nature générale des modifications. EX : Les modifications concernent le désenfumage des circulations des étages » La case dans la colonne PRECISIONS commence par Les modifications concernent...",
          "You may give some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the unfavorable opinion.EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The changes relate to... then after a space  The unfavorable opinion is based on:...":
            "Vous pouvez donner quelques détails sur la nature générale des modifications. EX : Les modifications concernent le désenfumage de la circulation des étages. Donner ensuite les raisons de l'avis défavorable.EX : L'avis défavorable est motivé par :- la non-conformité des installations de désenfumage de circulation ;- l'absence de formalisation des consignes d'évacuation. La case de la colonne PRECISIONS commence par Les changements portent sur... puis après un espace L'avis défavorable est basé sur :...",
          "You may give some details on the general nature of the modifications. EX: The modifications relate to the smoke extraction of the circulation of the floors. Then give the reasons for the without opinion.EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports ”.The box in the PRECISIONS column begins with  The changes relate to... ” then after a space  The absence of an opinion is justified by:...":
            "Vous pouvez donner quelques détails sur la nature générale des modifications. EX : Les modifications concernent le désenfumage de la circulation des étages. Donner ensuite les raisons du sans avis. EX : L'absence d'avis est motivée par la non présentation des rapports de vérifications réglementaires ». L'encadré dans la colonne PRECISIONS commence par Les modifications portent sur... » puis après un espace Le l'absence d'avis est justifiée par :...",
          "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage .The box in the PRECISIONS column begins with  The reception is on...":
            "Si nécessaire, donnez quelques précisions sur la nature du travail reçu. EX : L'accueil porte sur les installations de désenfumage au 3e étage .La case de la colonne PRECISIONS commence par L'accueil est sur...",
          "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The reception is on...  then after a space  The unfavorable opinion is based on:...":
            "Si nécessaire, donnez quelques précisions sur la nature du travail reçu. EX : L'accueil porte sur les installations de désenfumage au 3e étage. Donner ensuite les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par :- la non-conformité des installations de désenfumage de circulation ;- l'absence de formalisation des consignes d'évacuation. La case de la colonne PRÉCISIONS commence par La réception est sur... puis après un espace L'avis défavorable est basé sur :...",
          "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  The reception is on... ” then after a space  The absence of an opinion is justified by:...":
            "Si nécessaire, donnez quelques précisions sur la nature du travail reçu. EX : L'accueil porte sur les installations de désenfumage au 3e étage. Donner ensuite les raisons du sans avis. EX : L'absence d'avis est motivée par la non présentation des rapports de vérification réglementaires . La case dans la colonne PRECISIONS commence par La réception est le... » puis après un espace L'absence d'avis est justifiée par :.. .",
          "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage .The box in the PRECISIONS column begins with  The reception is on... ":
            "Si nécessaire, donnez quelques précisions sur la nature du travail reçu. EX : L'accueil porte sur les installations de désenfumage au 3e étage .La case de la colonne PRECISIONS commence par L'accueil est sur",
          "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations; -  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The reception is on... ” then after a space  The unfavorable opinion is based on:...":
            "Si nécessaire, donnez quelques précisions sur la nature du travail reçu. EX : L'accueil porte sur les installations de désenfumage au 3e étage. Donner ensuite les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par : - la non-conformité des installations de désenfumage de circulation ; - le manque de formalisation des consignes d'évacuation. La case de la colonne PRÉCISIONS commence par La réception est sur... » puis après un espace L'avis défavorable est basé sur :...",
          "If necessary, give some details on the nature of the work received. EX: The reception covers the smoke extraction installations at 3e stage.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of regulatory verification reports .The box in the PRECISIONS column begins with  The reception is on...  then after a space  The absence of an opinion is justified by:...":
            "Si nécessaire, donnez quelques précisions sur la nature du travail reçu. EX : L'accueil porte sur les installations de désenfumage au 3e étage. Donner ensuite les raisons du sans avis. EX : L'absence d'avis est motivée par la non présentation des rapports de vérification réglementaires. La case dans la colonne PRECISIONS commence par La réception est le... puis après un espace L'absence d'avis est justifiée par :...",
          "Give the new classification of the establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with  Reclassification in...":
            "Donner le nouveau classement de l'établissement, si nécessaire. EX : Reclassement en type X de 3ème catégorie ». La case de la colonne PRECISIONS commence par Reclassement en...",
          "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  the unfavorable opinion in progress;-  inconsistencies relating to workforce declarations. The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The unfavorable opinion is based on:...":
            "Donner le classement demandé si nécessaire. EX : Demande de reclassement en type X de 3e catégorie. Puis motiver l'avis défavorable. EX : L'avis défavorable est motivé par :- l'avis défavorable en cours ;- des incohérences relatives aux déclarations d'effectifs. La case de la colonne PRÉCISIONS commence par Demande de reclassement en... » puis après un espace L'avis défavorable est fondé sur :...",
          "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce .The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The absence of an opinion is justified by:...":
            "Donner le classement demandé si nécessaire. EX : Demande de reclassement en type X de 3e catégorie. Puis motiver le sans avis. EX : L'absence d'avis est motivée par la non présentation d'une déclaration d'effectifs cohérente. La case dans la colonne PRECISIONS commence par Demande de reclassement en... » puis après un espace L'absence d'avis est justifiée par :...",
          "Give the new classification of the establishment, if necessary. EX: Reclassification in type X of 3rd category ”.The box in the PRECISIONS column begins with  Reclassification in...":
            "Donner le nouveau classement de l'établissement, si nécessaire. EX : Reclassement en type X de 3ème catégorie ». La case de la colonne PRECISIONS commence par Reclassement en...",
          "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  the unfavorable opinion in progress;-  inconsistencies relating to workforce declarations. The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The unfavorable opinion is based on:...":
            "Donner le classement demandé si nécessaire. EX : Demande de reclassement en type X de 3e catégorie. Puis motiver l'avis défavorable. EX : L'avis défavorable est motivé par :- l'avis défavorable en cours ;- des incohérences relatives aux déclarations d'effectifs. La case de la colonne PRÉCISIONS commence par Demande de reclassement en... » puis après un espace L'avis défavorable est fondé sur :...",
          "Give the requested classification if necessary. EX: Request for reclassification in type X of 3e category Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of a coherent declaration of the workforce .The box in the PRECISIONS column begins with  Request for reclassification in... ” then after a space  The absence of an opinion is justified by:...":
            "Donner le classement demandé si nécessaire. EX : Demande de reclassement en type X de 3e catégorie Puis motiver le sans avis. EX : L'absence d'avis est motivée par la non présentation d'une déclaration d'effectifs cohérente. La case dans la colonne PRECISIONS commence par Demande de reclassement en... » puis après un espace L'absence d'avis est justifiée par :...",
          "If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system. The box in the PRECISIONS column begins with  The opinion relates to ...":
            "Le cas échéant, donnez quelques précisions sur la nature de l'avis demandé. EX : L'avis porte sur les spécifications fonctionnelles du système de sécurité incendie. La case de la colonne PRECISIONS commence par L'avis porte sur ...",
          "If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  non-compliance of circulation smoke extraction installations;-  The lack of automatic fire detection on the ground floor. The box in the PRECISIONS column begins with  The opinion relates to ...  then after a space  The unfavorable opinion is based on:...":
            "Le cas échéant, donnez quelques précisions sur la nature de l'avis demandé. EX : L'avis porte sur les spécifications fonctionnelles du système de sécurité incendie. Donner ensuite les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par :- la non-conformité des installations de désenfumage de circulation ;- l'absence de détection automatique d'incendie au rez-de-chaussée. La case de la colonne PRECISIONS commence par L'avis porte sur ... puis après un espace L'avis défavorable est basé sur :...",
          "If necessary, give some details on the nature of the opinion requested. EX: The opinion relates to the functional specifications of the fire safety system.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of precise plans.The box in the PRECISIONS column begins with  The opinion relates to ...  then after a space  The absence of an opinion is justified by:...":
            "Le cas échéant, donnez quelques précisions sur la nature de l'avis demandé. EX : L'avis porte sur les spécifications fonctionnelles du système de sécurité incendie. Donner ensuite les raisons du sans avis. EX : L'absence d'avis est motivée par la non présentation de plans précis. La case de la colonne PRECISIONS commence par L'avis porte sur ... puis après un espace L'absence d'avis est justifiée par :...",
          "If necessary, give some details on the nature of the request and the compensatory measures validated by the commission. EX: The request relates to the structure's lack of fire stability. As a compensatory measure, a category A fire safety system is set up with generalized automatic detection. The box in the PRECISIONS column begins with  The request relates to...  then after a space  In compensatory measures...":
            "Le cas échéant, donnez quelques précisions sur la nature de la demande et les mesures compensatoires validées par la commission. EX : La demande porte sur le manque de stabilité au feu de la structure. En mesure compensatoire, un système de sécurité incendie de catégorie A est mis en place avec détection automatique généralisée. La case de la colonne PRÉCISIONS commence par La demande concerne... puis après un espace En mesures compensatoires...",
          "You may give some details on the nature of the request. EX: The request relates to the structure's lack of fire stability.Then give the reasons for the unfavorable opinion. EX: The unfavorable opinion is motivated by:-  Compensatory measures that do not allow the evacuation time to be reduced;-  the lack of formalization of evacuation instructions. The box in the PRECISIONS column begins with  The request relates to... ” then after a space  The unfavorable opinion is based on:...":
            "Vous pouvez donner quelques détails sur la nature de la demande. EX : La demande porte sur le manque de stabilité au feu de l'ouvrage. Donner ensuite les raisons de l'avis défavorable. EX : L'avis défavorable est motivé par :- Des mesures compensatoires ne permettant pas de réduire le temps d'évacuation ;- L'absence de formalisation des consignes d'évacuation. La case de la colonne PRÉCISIONS commence par La demande porte sur... » puis après un espace L'avis défavorable est fondé sur :...",
          "You may give some details on the nature of the request. EX: The request relates to the structure's lack of fire stability.Then give the reasons for the without opinion. EX: The absence of an opinion is motivated by the non-presentation of the plans mentioned in the file .The box in the PRECISIONS column begins with  The request relates to...  then after a space  The absence of an opinion is justified by:...":
            "Vous pouvez donner quelques détails sur la nature de la demande. EX : La demande porte sur le manque de stabilité au feu de l'ouvrage. Donner ensuite les raisons du sans avis. EX : L'absence d'avis est motivée par la non présentation des plans mentionnés dans le dossier. La case dans la colonne PRECISIONS commence par La demande porte sur... puis après un espace L'absence d'avis est justifiée par : ...",
          "If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire safety system. ”The box in the PRECISIONS column begins with The formal notice relates to ...":
            "Le cas échéant, donnez quelques précisions sur la nature de la mise en demeure. EX : La mise en demeure du maire concerne la réfection du système de sécurité incendie. « La case de la colonne PRECISIONS commence par La mise en demeure porte sur ...",
          "If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire  safety system. The box in the PRECISIONS column begins with The formal notice relates to ...":
            "Le cas échéant, donnez quelques précisions sur la nature de la mise en demeure. EX : La mise en demeure du maire concerne la réfection du système de sécurité incendie. La case de la colonne PRECISIONS commence par La mise en demeure porte sur ...",
          "If necessary, give some details on the nature of the formal notice. EX: The mayor's formal notice concerns the repair of the fire safety system. ”The box in the PRECISIONS column begins with The formal notice relates to ...":
            "Le cas échéant, donnez quelques précisions sur la nature de la mise en demeure. EX : La mise en demeure du maire concerne la réfection du système de sécurité incendie. « La case de la colonne PRECISIONS commence par La mise en demeure porte sur ...",
          "If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...":
            "Si nécessaire, donnez quelques détails sur l'intervention. EX : Intervention d'urgence pour fuite de gaz dans l'établissement. 124évacués. La fuite provenait du robinet d'arrêt de la cuisine. La case dans la colonne PRÉCISIONS commence par Intervention d'urgence pour ...",
          "If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...":
            "Si nécessaire, donnez quelques détails sur l'intervention. EX : Intervention d'urgence pour fuite de gaz dans l'établissement. 124 évacués. La fuite provenait du robinet d'arrêt de la cuisine. La case dans la colonne PRÉCISIONS commence par Intervention d'urgence pour ...",
          "If necessary, give some details about the intervention. EX: Emergency intervention for gas leaks in the establishment. 124 evacuated. The leak came from the shut-off valve in the kitchen. The box in the PRECISIONS column begins with Emergency response for ...":
            "Si nécessaire, donnez quelques détails sur l'intervention. EX : Intervention d'urgence pour fuite de gaz dans l'établissement. 124 évacués. La fuite provenait du robinet d'arrêt de la cuisine. La case dans la colonne PRÉCISIONS commence par Intervention d'urgence pour ...",
        },
      },
    },

    fallbackLng: "fr",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
