kid.controller('companyController', ['$scope', 'companyService', '$state', '$cookieStore', 'locationService', 'util', '$timeout', 'ngProgressFactory', 'Upload', '$http',
    function($scope, companyService, $state, $cookieStore, locationService, util, $timeout, ngProgressFactory, Upload, $http){

	$scope.states = {};
	$scope.citys = {};
	$scope.companyDto = {};
	$scope.phoneDto = {};
	$scope.companyDto.phoneDtos = [];
	$scope.messages = "";
	$scope.cssMessage = "";
	$scope.visibleMessage = false;
	$scope.companys = {};
	$scope.company = {};
	$scope.widthAndHeigth = {};
	$scope.imageDto = {};
	$scope.companyDto.categoryDto = {};
	$scope.companyDto.categoryDtos = [];
	$scope.categorys = {};
	$scope.characteristcs = {};
	$scope.auxIds = [];
	$scope.listCatCha = [];
	$scope.objCatCha = {};
	$scope.listWeek = [];
	$scope.listSchedule = [];
	$scope.companyDto.hourDateDtos = [];
	$scope.hourDateDto = {};
	$scope.hourDateDtoAux = {};
	$scope.hourDates = [];
	$scope.listTypeFood = [];
	
	$scope.progressbar = ngProgressFactory.createInstance();
	
	$scope.addHourDate = function(week, hourI, hourF){
		$scope.hourDateDto = {};
		$scope.hourDateDtoAux = {};
		$scope.hourDateDto.week = week;
		$scope.hourDateDto.hourInitial = hourI;
		$scope.hourDateDto.hourFinish = hourF;
		for (var i = 0; i < $scope.listWeek.length; i++) {
			if($scope.listWeek[i].idWeek == week){
				$scope.hourDateDtoAux.week = $scope.listWeek[i].dsWeek;
			}
		}
		for (var i = 0; i < $scope.listSchedule.length; i++) {
			if($scope.listSchedule[i].idSchedule == hourI){
				$scope.hourDateDtoAux.hourInitial = $scope.listSchedule[i].dsSchedule;
			}
			
			if($scope.listSchedule[i].idSchedule == hourF){
				$scope.hourDateDtoAux.hourFinish = $scope.listSchedule[i].dsSchedule;
			}
		}
		
		$scope.companyDto.hourDateDtos.push($scope.hourDateDto);
		$scope.hourDates.push($scope.hourDateDtoAux);
	};
	
	/**
	 * Method upload file
	 */
	$scope.uploadFile = function (input, typeImage) {
		console.log(input.files[0]);
		console.log(document.getElementById('photo-upload').files[0]);
		var arquivo = document.getElementById('photo-upload').files[0];
		var reader = new FileReader();
	   reader.readAsDataURL(arquivo);
	   reader.onload = function (e) {
		 console.log(e);
	     console.log(reader.result);
	     $scope.userPhoto = reader.result.replace(/data:image\/jpeg;base64,/g, '');
         $scope.imageDto.dataImage = $scope.userPhoto;
         $scope.imageDto.desImage = e.type;
         $scope.imageDto.nameCompany = $scope.companyDto.desName;
         $scope.imageDto.type = typeImage;
         companyService.getImage(util.getUri(), $scope.imageDto).success(function(data, status, headers, config) {
 			console.log(data);
 		}).error(function(data, status, headers, config) {
 			$scope.messages = "Error: não foi processado...";
 			$scope.visibleMessage = true;
 			$scope.cssMessage = "message-table-incorret";
 	    });
	   };
	   reader.onerror = function (error) {
	     console.log('Error: ', error);
	   };
	};
	
	$scope.initEdit = function(){
		if($scope.company.idCompany == undefined || $scope.company.idCompany == null){
			$scope.company = $cookieStore.get("company");
		}
	};
	
	var searching = function() {
		$state.go('searchCompany');
    };
	
	$scope.search = function(){
		$state.go('searchCompany');
	};
	
	$scope.back = function(){
		$state.go('company');
	};
	
	$scope.edit = function(company){
		console.log(company);
		$cookieStore.put("company", company);
		$state.go('editCompany');
	};
	
	/**
	 * List schedule
	 */
	companyService.getListSchedule(util.getUri()).success(function(data, status, headers, config) {
		$scope.listSchedule = data;
	}).error(function(data, status, headers, config) {
		
    });
	
	/**
	 * List schedule
	 */
	companyService.getListTypeFood(util.getUri()).success(function(data, status, headers, config) {
		$scope.listTypeFood = data;
	}).error(function(data, status, headers, config) {
		
    });
	
	/**
	 * List week
	 */
	companyService.getListWeek(util.getUri()).success(function(data, status, headers, config) {
		$scope.listWeek = data;
	}).error(function(data, status, headers, config) {
		
    });
	
	/**
	 * Method loaded states in country Brazil
	 */
	locationService.getStates(util.getUri(), 1).success(function(data, status, headers, config) {
		$scope.states = data;
	}).error(function(data, status, headers, config) {
		
    });
	
	/**
	 * Method loaded categorys
	 */
	companyService.getListCategory(util.getUri()).success(function(data, status, headers, config) {
		$scope.categorys = data;
	}).error(function(data, status, headers, config) {
		
    });
	
	$scope.mountObjCharacterisct = function(idCharacteristc){
		$scope.companyDto.categoryDto = {};
		for (var i = 0; i < $scope.listCatCha.length; i++) {
			if($scope.listCatCha[i].idCharac == idCharacteristc){
				$scope.companyDto.categoryDto.category = $scope.listCatCha[i].idCategory;
				$scope.companyDto.categoryDto.characteristcs = $scope.listCatCha[i].idCharac;
				console.log($scope.companyDto.categoryDto);
				var index = $scope.companyDto.categoryDtos.indexOf($scope.companyDto.categoryDto);
				console.log(index);
				if (index > -1) {
					$scope.companyDto.categoryDtos.splice(index, 1);
				}
				$scope.companyDto.categoryDtos.push($scope.companyDto.categoryDto);
			}
		}
		console.log($scope.companyDto.categoryDtos);
	};
	
	/**
	 * Method mount characteristic
	 */
	$scope.characterist = function(idCategory){
		if(document.getElementById(idCategory).checked==false){
			var index = $scope.auxIds.indexOf(idCategory);
			if (index > -1) {
				$scope.auxIds.splice(index, 1);
			}
			if($scope.auxIds.length <= 0){
				$scope.characteristcs = {};
				$scope.listCatCha = {};
			}
		}else{
			$scope.auxIds.push(idCategory);
		}
		$scope.companyDto.categoryDtos = [];
		$scope.listCatCha = [];
		for (var i = 0; i < $scope.auxIds.length; i++) {
			companyService.getListCharacteristic(util.getUri(), $scope.auxIds[i]).success(function(data, status, headers, config) {
				$scope.characteristcs = data;
				for(var j = 0; j < $scope.characteristcs.length; j++){
					$scope.objCatCha = {};
					$scope.objCatCha.idCategory = idCategory;
					console.log($scope.characteristcs[j].idCharacteristic);
					$scope.objCatCha.idCharac = $scope.characteristcs[j].idCharacteristic;
					$scope.listCatCha.push($scope.objCatCha);
				}
			}).error(function(data, status, headers, config) {
				$scope.characteristcs = {};
		    });
		}
	};
	
	/**
	 * Method in selected state by loaded city
	 */
	$scope.getCityByState = function(objState){
		locationService.getCitys(util.getUri(), objState).success(function(data, status, headers, config) {
			$scope.citys = data;
		}).error(function(data, status, headers, config) {
			
	    });
	};
	
	/**
	 * Method save company
	 */
	$scope.saveCompany = function(numPhone, cellPhone, food){
		$scope.progressbar.start();
		$timeout($scope.progressbar.complete(), 10000);
		$scope.progressbar.set(100);
		$scope.companyDto.phoneDtos = [];
		$scope.phoneDto.numPhone = numPhone;
		$scope.companyDto.phoneDtos.push($scope.phoneDto);
		$scope.phoneDto.numPhone = cellPhone;
		$scope.companyDto.typeFood = food;
		$scope.companyDto.phoneDtos.push($scope.phoneDto);
		console.log($scope.companyDto);
		companyService.getCompany(util.getUri(), $scope.companyDto).success(function(data, status, headers, config) {
			$scope.messages = "Cadastrado com sucesso...";
			$scope.visibleMessage = true;
			$scope.cssMessage = "message-table-correct";
			$scope.states = {};
			$scope.citys = {};
			$scope.companyDto = {};
			$scope.phoneDto = {};
			$scope.companyDto.phoneDtos = [];
			$scope.companyDto.typeFood = food;
			$scope.phoneFixed = "";
			$scope.celPhone = "";
			$scope.listCatCha = [];
			$scope.companyDto.categoryDtos = [];
			$scope.auxIds = [];
			$scope.categorys = {};
			$scope.characteristcs = {};
			document.getElementById("photo-upload").value = "";
			locationService.getStates(util.getUri(), 1).success(function(data, status, headers, config) {
				$scope.states = data;
			}).error(function(data, status, headers, config) {
				
		    });
			companyService.getListCategory(util.getUri()).success(function(data, status, headers, config) {
				$scope.categorys = data;
			}).error(function(data, status, headers, config) {
				
		    });
		}).error(function(data, status, headers, config) {
			$scope.messages = "Error: não foi processado...";
			$scope.visibleMessage = true;
			$scope.cssMessage = "message-table-incorret";
	    });
	};
	
	/**
	 * Method search company
	 */
	$scope.searchCompany = function(nameEstablishment, responsibleEstablishment,
			cnpj, objCity){
		companyService.getListCompany(util.getUri(), nameEstablishment, responsibleEstablishment,
				cnpj, objCity).success(function(data, status, headers, config) {
			$scope.companys = data;
			if($scope.companys == null){
				$scope.messages = "Não trouxe nenhum dado referente aos filtros selecionados.";
				$scope.visibleMessage = true;
				$scope.cssMessage = "message-table-incorret";
			}
		}).error(function(data, status, headers, config) {
			$scope.messages = "Error: não foi processado...";
			$scope.visibleMessage = true;
			$scope.cssMessage = "message-table-incorret";
	    });
	};
	
	/**
	 * Method in inative company
	 */
	$scope.inactiveCompany = function(company){
		companyService.getInactiveCompany(util.getUri(), company).success(function(data, status, headers, config) {
			if(data == null){
				$scope.messages = "O estabeecimento permanece ativo por algum erro interno no sistema.";
				$scope.visibleMessage = true;
				$scope.cssMessage = "message-table-incorret";
			}else{
				companyService.getListCompany(util.getUri(), $scope.nameEstablishment, $scope.responsibleEstablishment,
						$scope.cnpj, $scope.objCity).success(function(data, status, headers, config) {
					$scope.companys = data;
					if($scope.companys == null){
						$scope.messages = "Não trouxe nenhum dado referente aos filtros selecionados.";
						$scope.visibleMessage = true;
						$scope.cssMessage = "message-table-incorret";
					}
				}).error(function(data, status, headers, config) {
					$scope.messages = "Error: não foi processado...";
					$scope.visibleMessage = true;
					$scope.cssMessage = "message-table-incorret";
			    });
			}
		}).error(function(data, status, headers, config) {
			$scope.messages = "Error: não foi processado...";
			$scope.visibleMessage = true;
			$scope.cssMessage = "message-table-incorret";
	    });
	};
	
	$scope.editCompany = function(){
		$scope.progressbar.start();
		$timeout($scope.progressbar.complete(), 10000);
		$scope.progressbar.set(100);
		companyService.getEditCompany(util.getUri(), $scope.company).success(function(data, status, headers, config) {
			if(data == null){
				$scope.messages = "O estabeecimento não pode ser alterado.";
				$scope.visibleMessage = true;
				$scope.cssMessage = "message-table-incorret";
			}
			$scope.messages = "Alterado com sucesso...";
			$scope.visibleMessage = true;
			$scope.cssMessage = "message-table-correct";
			$timeout(searching, 2000);
		}).error(function(data, status, headers, config) {
			$scope.messages = "Error: não foi processado...";
			$scope.visibleMessage = true;
			$scope.cssMessage = "message-table-incorret";
	    });
	};
	
}]);