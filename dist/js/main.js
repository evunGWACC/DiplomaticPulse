$("#filter-container").empty();var container=document.getElementById("filter-container"),date=new Filter("DateRange","Time",container),contentType=new Filter("Content Type","Content Type",container),region=new Filter("Region","Region",container),subregion=new Filter("Sub-Region","Sub-Region",container),CombinedFilter=new UNFilter(container),contenttable=new ContentTable(["Content Type","Entity Name","Timestamp","teaser","Source","URL","doctype","favorites","retweets","mediaURL"],$(".table-tweets")),mapdefinition=[{dim:"ISO2",label:"ISO Code"},{dim:"Entity Name",label:"Member State"}],worldmap2=new WorldMap(mapdefinition,'=Sum({<[Entity Type]={"Member State"}>}[ContentCounter])',document.getElementById("worldmapsmall")),hashtags=new WordCloud("hashtags","Sum([HashtagCounter])",document.getElementById("wordcloud")),tweettable=new Table([{dim:"Entity Name",label:"Member State"}],{label:"Web and Tweets",value:'=Sum({<[Entity Type]={"Member State"}>}[ContentCounter])'},document.getElementById("tweettable")),mentions=new Table([{dim:"mentions",label:"Mentioned"}],{label:"Number of mentions",value:"Sum(MentionCounter)"},document.getElementById("mentiontable")),linechart=new Linechart("Date","=Sum({<DateRange=>}ContentCounter)",document.getElementById("linechart"));$("#clearfilter").on("click",function(){$(this);$("#qv-search-clear").hide(),$("#qv-search").val(""),QIX.app.clearAll().then(function(){pubsub.publish("update")})}),pubsub.subscribe("kill",function(){date=null,contentType=null,org=null,intorg=null,un=null,worldmap2=null,tweettable=null,mentions=null,region=null,subregion=null,linechart=null});