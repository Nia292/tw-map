(this["webpackJsonptw-thrall-map"]=this["webpackJsonptw-thrall-map"]||[]).push([[0],{22:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var a,o=n(1),i=n.n(o),c=n(9),s=n.n(c),r=(n(22),n(23),n(13)),l=n(14),d=n(17),h=n(16),j=(n(24),n(25),n(4)),u=n(37),f=n(38),b=n(39),m=n(2),p=(n(26),n(0)),O=function(e){return Object(p.jsxs)("div",{className:"thrall-header",onClick:function(){return e.onSelect(e.thrall)},children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("div",{className:"thrall-header-name",children:e.thrall.name}),Object(p.jsx)("div",{className:"thrall-header-type",children:e.thrall.type})]}),Object(p.jsx)("div",{style:{marginLeft:"auto",marginRight:"16px"},children:Object(p.jsx)("span",{className:"material-icons",style:{fontSize:"20pt"},children:e.icon})})]})},x=function(e){return Object(p.jsx)(O,{onSelect:e.onSelect,thrall:e.thrall,icon:"chevron_right"})};!function(e){e.ALCHEMIST="ALCHEMIST",e.BLACKSMITH="BLACKSMITH",e.ARMORER="ARMORER",e.CARPENTER="CARPENTER",e.TASKMASTER="TASKMASTER",e.GROOMER="GROOMER",e.SMELTER="SMELTER  "}(a||(a={}));n(28),n(29);var v=function(e){return Object(p.jsx)("div",{onClick:function(){return e.onSelectLocation(e.location)},className:"thrall-detail-single-location",children:Object(p.jsxs)("div",{className:"display-in-row display-in-center ",children:[Object(p.jsx)("div",{style:{marginRight:"16px"},children:Object(p.jsx)("img",{alt:"icon camp",src:"/tw-map/fc_assets/icon_camp.png"})}),Object(p.jsxs)("div",{style:{marginRight:"auto"},children:[Object(p.jsx)("div",{style:{fontSize:"14pt"},children:e.location.location}),Object(p.jsxs)("div",{style:{fontSize:"11pt"},children:["Spawns at the ",e.location.spawnSpot," spot."]}),Object(p.jsx)("div",{style:{fontSize:"9pt"},children:e.location.spawnSpotDetail}),Object(p.jsxs)("div",{style:{fontSize:"9pt"},children:["Coordiantes: ",e.location.x," / ",e.location.y," / ",e.location.z]})]})]})})},g=function(e){var t;return Object(p.jsx)("div",{className:"thrall-location-list-container",children:Object(p.jsxs)("div",{children:[Object(p.jsx)("div",{className:"thrall-location-list-header",children:"Locations"}),Object(p.jsx)("div",{className:"thrall-location-list-subheader",children:"Click a location to jump to it"}),Object(p.jsx)("div",{className:"thrall-details-locations",children:null===(t=e.thrall)||void 0===t?void 0:t.locations.map((function(t,n){return Object(p.jsx)(v,{onSelectLocation:e.onSelectLocation,location:t},n)}))})]})})},S=function(e){var t,n=e.focused?"thrall-details-sliding-in":"thrall-details-sliding-out";return Object(p.jsx)("div",{className:"thrall-details-container "+n,children:Object(p.jsxs)("div",{className:"thrall-details",children:[Object(p.jsx)(O,{thrall:e.thrall||{locations:[],name:"",type:a.ALCHEMIST,id:"ada"},icon:"chevron_left",onSelect:e.onDeSelect}),Object(p.jsx)("div",{className:"thrall-location-description",children:null===(t=e.thrall)||void 0===t?void 0:t.locationDescription}),Object(p.jsx)(g,{thrall:e.thrall,onSelectLocation:e.onSelectLocation})]})})},w=(n(30),function(e){var t=e.selectedThrallFocused?"thrall-list-sliding-out":"thrall-list-sliding-in";return Object(p.jsxs)(i.a.Fragment,{children:[Object(p.jsx)(S,{focused:e.selectedThrallFocused,onSelectLocation:e.onSelectLocation,thrall:e.selectedThrall,onDeSelect:e.onDeselectThrall}),Object(p.jsx)("div",{className:"thrall-list "+t,children:e.thralls.sort((function(e,t){return e.name.localeCompare(t.name)})).map((function(t){return Object(p.jsx)(x,{onSelect:e.onSelectThrall,thrall:t},t.id)}))})]})});function y(e){return{lat:-1*e.y,lng:e.x}}var C=n(34);function N(e){var t=Object(C.a)();if(e.location&&!e.location.preventPan){var n=e.location.zoom?e.location.zoom:t.getZoom(),a=e.location.center?e.location.center:t.getCenter();t.flyTo(a,n)}return null}var T=n(35),L=n(36),k=Object(m.icon)({iconUrl:"/tw-map/fc_assets/icon_camp.png",iconSize:[24,24],tooltipAnchor:[0,12]});function R(e){if(!e.focused)return Object(p.jsx)(i.a.Fragment,{});var t=e.thrall;return t?t.locations.map((function(e){return function(e,t){return Object(p.jsx)(T.a,{icon:k,position:t,children:Object(p.jsx)(L.a,{direction:"bottom",children:e.name})},t.lat+"_"+t.lng)}(t,y(e))})):Object(p.jsx)(i.a.Fragment,{})}function z(e){var t=Object(C.b)({zoom:function(){console.log(t.getZoom()),e.onZoomCenterChange({zoom:t.getZoom(),center:t.getCenter(),preventPan:!0})},click:function(e){console.log(e.latlng.lat,e.latlng.lng)},drag:function(){t.panInsideBounds(e.mapBounds,{animate:!1}),e.onZoomCenterChange({zoom:t.getZoom(),center:t.getCenter(),preventPan:!0})}});return null}n(31);var E=function(e){return e.open?Object(p.jsx)("div",{className:"dialog-container",onClick:e.onClose,children:Object(p.jsxs)("div",{className:"dialog",onClick:function(e){"A"!==e.target.tagName&&e.preventDefault(),e.stopPropagation()},children:[Object(p.jsx)("div",{className:"dialog-header",children:"Information"}),Object(p.jsx)("div",{className:"dialog-subheader",children:"About"}),Object(p.jsxs)("div",{children:["This map contains information about the thralls added by the\xa0",Object(p.jsx)("a",{target:"_blank",href:"https://steamcommunity.com/sharedfiles/filedetails/?id=1326031593",rel:"noreferrer",children:"Thrall Wars Dungeon Mod"}),".",Object(p.jsx)("br",{}),"Check out the mod page for more information!",Object(p.jsx)("br",{}),"You can find the source code over on ",Object(p.jsx)("a",{target:"_blank",href:"https://github.com/Nia292/tw-map",rel:"noreferrer",children:"GitHub"}),"."]}),Object(p.jsx)("div",{className:"dialog-subheader",children:"Privacy"}),Object(p.jsxs)("div",{children:["This site does not track your information. ",Object(p.jsx)("br",{}),"This site does not use cookies. ",Object(p.jsx)("br",{}),"This site does not store data on your local device aside from normal browser caching. ",Object(p.jsx)("br",{}),"Site provided by\xa0",Object(p.jsx)("a",{target:"_blank",href:"https://pages.github.com/",rel:"noreferrer",children:"GitHub pages"}),". Check out\xa0",Object(p.jsx)("a",{target:"_blank",href:"https://docs.github.com/en/github/site-policy/github-privacy-statement",rel:"noreferrer",children:"GitHub's privacy statement"}),"\xa0to find out what data GitHub collects."]}),Object(p.jsx)("div",{className:"dialog-subheader",children:"Contributing"}),Object(p.jsx)("div",{children:"This map is far from completed. Head over to GitHub to find out how to contribute data!"}),Object(p.jsx)("div",{className:"dialog-subheader",children:"More"}),Object(p.jsxs)("div",{children:["There is also the ",Object(p.jsx)("a",{target:"_blank",href:"https://nia292.github.io/tw-dice-calc/index.html",rel:"noreferrer",children:"TW Dice Calculator"})," to plan your RP characters!"]}),Object(p.jsx)("div",{className:"dialog-subheader",children:"Credits"}),Object(p.jsxs)("div",{children:["Funcom for Conan Exiles and the map!",Object(p.jsx)("br",{}),"Savage Wilds mod for the Savage Wilds map! ",Object(p.jsx)("br",{}),"Japata for helping me with the locations and general thrall information. \ud83d\udc0d"]}),Object(p.jsx)("div",{className:"dialog-subheader",children:"Contributors"}),Object(p.jsx)("div",{})]})}):Object(p.jsx)(i.a.Fragment,{})},M=n(10),_=n(5),A=(n(32),function(e){function t(t,n){if(""!==t){var a=Number.parseInt(t,10);e.onOffsetChange(Object(_.a)(Object(_.a)({},e.offset),{},Object(M.a)({},n,a)))}}return e.open?Object(p.jsx)("div",{className:"dialog-container",onClick:e.onClose,children:Object(p.jsxs)("div",{className:"dialog",onClick:function(e){"A"!==e.target.tagName&&e.preventDefault(),e.stopPropagation()},children:[Object(p.jsx)("div",{className:"dialog-header",children:"Settings"}),Object(p.jsx)("div",{className:"dialog-subheader",children:"Map Offsets"}),Object(p.jsxs)("div",{children:[Object(p.jsx)("p",{children:"Used to correct initial reading errors."}),Object(p.jsxs)("div",{className:"settings-input",children:[Object(p.jsx)("label",{htmlFor:"offset-top",children:"Offset Top"}),Object(p.jsx)("input",{id:"offset-top",type:"number",onChange:function(e){return t(e.target.value,"offsetTop")},value:e.offset.offsetTop})]}),Object(p.jsxs)("div",{className:"settings-input",children:[Object(p.jsx)("label",{htmlFor:"offset-top",children:"Offset Bottom"}),Object(p.jsx)("input",{id:"offset-top",type:"number",onChange:function(e){return t(e.target.value,"offsetBot")},value:e.offset.offsetBot})]}),Object(p.jsxs)("div",{className:"settings-input",children:[Object(p.jsx)("label",{htmlFor:"offset-top",children:"Offset Left"}),Object(p.jsx)("input",{id:"offset-top",type:"number",onChange:function(e){return t(e.target.value,"offsetLeft")},value:e.offset.offsetLeft})]}),Object(p.jsxs)("div",{className:"settings-input",children:[Object(p.jsx)("label",{htmlFor:"offset-top",children:"Offset Right"}),Object(p.jsx)("input",{id:"offset-top",type:"number",onChange:function(e){return t(e.target.value,"offsetRight")},value:e.offset.offsetRight})]})]})]})}):Object(p.jsx)(i.a.Fragment,{})});function Z(e,t,n){var a=e.find((function(e){return function(e,t){var n=Math.abs(e.x-t.x),a=Math.abs(e.y-t.y);return n<=.005&&a<=.005}(e,t)}));a?a.names.push(n.name):e.push({x:t.x,y:t.y,z:t.z,names:[n.name]})}var F=Object(m.icon)({iconUrl:"/tw-map/fc_assets/icon_camp.png",iconSize:[24,24],tooltipAnchor:[0,12]});function B(e){if(e.focused)return Object(p.jsx)(i.a.Fragment,{});var t=function(e){var t=[];return e.forEach((function(e){e.locations.forEach((function(n){return Z(t,n,e)}))})),t}(e.thralls).map((function(e){return function(e){var t=y(e);return Object(p.jsx)(T.a,{icon:F,position:t,children:Object(p.jsx)(L.a,{direction:"bottom",children:Object(p.jsx)("div",{className:"display-in-column",children:e.names.map((function(e){return Object(p.jsx)("div",{children:e},e)}))})})},t.lat+"_"+t.lng)}(e)}));return Object(p.jsx)(i.a.Fragment,{children:t})}var H={lat:0,lng:0};function D(e){var t=Object(o.useState)(void 0),n=Object(j.a)(t,2),a=n[0],i=n[1],c=Object(o.useState)(!1),s=Object(j.a)(c,2),r=s[0],l=s[1],d=Object(o.useState)(void 0),h=Object(j.a)(d,2),O=h[0],x=h[1],v=Object(o.useState)(!1),g=Object(j.a)(v,2),S=g[0],C=g[1],T=Object(o.useState)(!1),L=Object(j.a)(T,2),k=L[0],M=L[1],_=Object(o.useState)(!1),Z=Object(j.a)(_,2),F=Z[0],D=Z[1],P=Object(o.useState)({offsetTop:0,offsetBot:0,offsetLeft:0,offsetRight:0}),q=Object(j.a)(P,2),I=q[0],G=q[1];var W,K=(null===O||void 0===O?void 0:O.center)?O.center:H,U=(null===O||void 0===O?void 0:O.zoom)?O.zoom:-8.7,J=function(e,t,n,a,o){var i=new m.LatLng(e-o.offsetBot,t-o.offsetLeft),c=new m.LatLng(n-o.offsetTop,a-o.offsetRight);return new m.LatLngBounds(i,c)}(e.south,e.west,e.north,e.east,I);return Object(p.jsxs)("div",{className:"thrall-map-wrapper",children:[Object(p.jsx)("div",{id:"info-button",className:"display-in-center",onClick:function(){return C(!0)},children:Object(p.jsx)("span",{className:"material-icons",style:{fontSize:"18pt"},children:"help_outline"})}),Object(p.jsx)("div",{id:"settings-button",className:"display-in-center",onClick:function(){return M(!0)},children:Object(p.jsx)("span",{className:"material-icons",style:{fontSize:"18pt"},children:"settings"})}),Object(p.jsxs)("div",{id:"hq-checkbox-wrapper",className:"display-in-center",children:[Object(p.jsx)("input",{id:"hq-checkbox",type:"checkbox",checked:F,onClick:function(e){var t=e.target;D(t.checked)}}),Object(p.jsx)("label",{htmlFor:"hq-checkbox",children:"HQ Map (11mb)"})]}),Object(p.jsxs)("div",{id:"map-link",className:"display-in-center",children:["Switch to\xa0",Object(p.jsx)("a",{rel:"noreferrer",href:(W=e.mapType,"exiled-lands"===W?"/tw-map?map=savage-wilds":"/tw-map?map=exiled-lands"),children:function(e){return"exiled-lands"===e?"Savage Wilds":"Exiled Lands"}(e.mapType)})]}),Object(p.jsx)(E,{open:S,onClose:function(){return C(!1)}}),Object(p.jsx)(A,{open:k,offset:I,onOffsetChange:G,onClose:function(){return M(!1)}}),Object(p.jsxs)(u.a,{center:K,style:{height:"100vh",width:"calc(100vw - var(--sidebar-width))"},minZoom:e.minZoom,maxZoom:e.maxZoom,zoomSnap:.1,zoomDelta:.1,crs:m.CRS.Simple,bounds:J,maxBounds:J,zoomControl:!1,zoom:U,children:[Object(p.jsx)(f.a,{}),!F&&Object(p.jsx)(b.a,{url:"/tw-map"+e.mapLq,bounds:J}),F&&Object(p.jsx)(b.a,{url:"/tw-map"+e.mapHq,bounds:J}),Object(p.jsx)(z,{mapBounds:J,onZoomCenterChange:x}),Object(p.jsx)(N,{location:O}),Object(p.jsx)(R,{thrall:a,focused:r}),Object(p.jsx)(B,{thralls:e.data,focused:r})]}),Object(p.jsx)("div",{className:"sidebar-right",children:Object(p.jsx)(w,{thralls:e.data,onSelectLocation:function(e){x({center:y(e),zoom:-7})},selectedThrallFocused:r,selectedThrall:a,onDeselectThrall:function(){l(!1),x({zoom:-8.7,center:H})},onSelectThrall:function(e){var t=function(e){if(e.length<=0)return null;if(e.length<=1)return y(e[0]);if(e.length<=2){var t=e.map((function(e){return y(e)}));return new m.Polyline(t).getBounds().getCenter()}var n=e.map((function(e){return y(e)}));return new m.Polygon(n).getBounds().getCenter()}(e.locations);t&&x({zoom:-8,center:t}),i(e),l(!0)}})})]})}function P(){var e=new URLSearchParams(window.location.search).get("map");if(e&&"savage-wilds"===e)return"savage-wilds";if(e&&"exiled-lands"===e)return"exiled-lands";if(!e){var t=window.location.protocol+"//"+window.location.host+window.location.pathname+"?map=exiled-lands";window.history.pushState({path:t},"",t)}return"exiled-lands"}var q=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={loaded:!1,data:{data:[],map_hq:"",map_lq:"",minZoom:-12,maxZoom:-4,bounds:{east:0,north:0,south:0,west:0}}},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;fetch(function(){var e=P();return console.log("/tw-map"),"exiled-lands"===e?"/tw-map/data.json":"/tw-map/data_sw.json"}()).then((function(e){return e.json()})).then((function(t){return e.setState({data:t,loaded:!0})}))}},{key:"render",value:function(){if(!this.state.loaded)return Object(p.jsx)("div",{children:"Map Loading..."});var e=this.state.data.bounds;return Object(p.jsx)("div",{children:Object(p.jsx)(D,{data:this.state.data.data,mapType:P(),minZoom:this.state.data.minZoom,maxZoom:this.state.data.maxZoom,mapHq:this.state.data.map_hq,mapLq:this.state.data.map_lq,north:e.north,west:e.west,east:e.east,south:e.south})})}}]),n}(i.a.Component);s.a.render(Object(p.jsx)(i.a.StrictMode,{children:Object(p.jsx)(q,{})}),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.3af3d4b9.chunk.js.map