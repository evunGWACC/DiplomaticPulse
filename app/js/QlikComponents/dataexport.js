/* global pubsub */
function Export(fieldlist, container) {
	
	var cube;
	var $tbody = container.find('tbody');
	var $thead = container.find('thead');
		
	var dimensionList = fieldlist.map(function(d) {
		return {
			"qNullSuppression": true,
			"qDef": {
				"qFieldDefs": [d],
				"qSortCriterias": [{
					"qSortByNumeric": -1
				}]
			}
		};
	});
		
	QIX.app.createSessionObject({
		"qInfo": {
			"qId": "",
			"qType": "ExportHyperCube"
		},
		"qHyperCubeDef": {
			"qDimensions": dimensionList,
			"qInterColumnSortOrder": [0],
			"qInitialDataFetch": [{
				qTop: 0,
				qLeft: 0,
				qHeight: 500,
				qWidth: dimensionList.length + 1
			}]
		}
	}).then(function(reply) {
		cube = reply;
		render();
	});
	
	function render() {
		cube.getLayout().then(function(layout) {
			$tbody.empty();
			$thead.empty();		
						
			var $header = $('<tr />');
			
			layout.qHyperCube.qDimensionInfo.forEach(function(d) {
				$('<th>' + d.qFallbackTitle + '</th>').appendTo($header);
			});
			
			$header.appendTo($thead);
						
			layout.qHyperCube.qDataPages[0].qMatrix.some(function(datarow, i) {
				
				var $row = $('<tr/>');
				
				datarow.forEach(function(d) {
					$('<td>' + d.qText + '</td>').appendTo($row);
				});
				
				$row.appendTo($tbody);
				
				return i === 75;
				
			});		
			
		});
	};
	
	function exportData() {
		
		var filename = 'DPExport_' + new Date(Date.now()).toISOString().substring(0,16);
		
		cube.exportData('CSV_C', '/qHyperCubeDef', filename).then(function(reply) {
			window.open('https://' + QIX.config.host + reply, '_blank');
		});
			
	};
	
	
	var doExport = pubsub.subscribe('export', exportData);
	var update = pubsub.subscribe('update', render);
	
};