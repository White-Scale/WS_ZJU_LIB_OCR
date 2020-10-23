(function() {
	$(".login-btn").click(function(){
		alert("已加载验证码识别插件byW_S");
		document.getElementById('title:login-dialog').innerHTML = "芜湖";//修改登录框title
		var canvas = document.createElement("canvas");//创建画板
		var image1 = document.getElementById('checkpic');//获取验证图片
		canvas.width =2 * image1.width - 10;
		canvas.height = image1.height;
		var ctx = canvas.getContext("2d");
		var getdata;
		var pix;
		image1.onload = function(){
			console.log('图片加载成功');
			console.log(this);
			ctx.drawImage(image1, 0, 0);//复制图像
			getdata = ctx.getImageData(0, 0, 130, 50);
			pix =getdata.data;
			var dat =new Array();
			//对图像进行二值化处理
			for (let i=0; i<pix.length; i+=4){
				let r = pix[i]
				let g = pix[i+1]
				let b = pix[i+2]
				if((r+g+b)>680){
					getdata.data[i] = 255;
					getdata.data[i+1] = 255;
					getdata.data[i+2] = 255;
					dat[i/4]=0;
				}else{
					getdata.data[i] = 0;
					getdata.data[i+1] = 0;
					getdata.data[i+2] = 0;
					dat[i/4]=1;
				}

			}
			console.log(dat);
			var count = 0;
			for(let n=0;n<dat.length;n++){
				if(dat[n]==1){
					count++;
				}
			}
			console.log(count);
			var output1 =  OCR(dat);
			ctx.putImageData(getdata, 0,0);
			pix =getdata.data;
			$("[name='verify']").attr("value",output1);
			$("[name='username']").attr("placeholder","输入学号准备起飞！");
			var url=canvas.toDataURL('image1/png');
			var a = document.createElement('a');
        	// 创建一个单击事件
        	var event = new MouseEvent('click');
        	a.download = name || 'ttest';
        	// 将生成的URL设置为a.href属性
        	a.href = url;
        	// 触发a的单击事件
			a.dispatchEvent(event);
		}
	})
})();
function OCR(arrobj){
	var sep = new Array();
	sep = separate(arrobj);
	var fea = new Array();
	for(let n=0; n<4; n++){
		fea[n] = getFeatrue(sep[n]);    
	}
	console.log(fea);
	var result1 = new Array();
	for(let i =0;i<4;i++){
		result1[i] = recognize(fea[i]);
	}
	var res =1000*result1[0]+100*result1[1]+10*result1[2]+1*result1[3];
	return res;
}
//对单个数组提取特征值
function getFeatrue(arr){
	var feature = new Array();
	for(let n=0; n<20; n++){
		feature[n] = 0;    
	}
	var k =0;
	for(let i =0;i<32;i += 8){
		for(let j =0;j<50;j += 10){
			for(let x=0;x<8;x++){
				for(let y =0;y<10;y++){
					if(arr[(y+j)*32+x+i]==1){
						feature[k]++;
					}
				}
			}
			k++;
		}
	}
	return feature;
}
//将一个图片一维数组转换为四个单独数组
function separate(arr){
	var result =new Array();
	for(let n=0; n<4; n++){
		result[n] = new Array();
	}
	for(let i =0;i<4;i++){
		for(let y = 0;y<50;y++){
			for(let x =0;x<32;x++){
				result[i][y*32+x] = arr[y*130+x+32*i];
			}
		}
		/*将每一块图片输出成图片文件
		var canvas = document.createElement("canvas");
		canvas.width  = 32;
		canvas.height = 50;
		var ctx = canvas.getContext("2d");
		var getdata1;
		var pix1;
		getdata1 = ctx.getImageData(0, 0,32, 50);
		pix1 =getdata1.data;
		for (let j=0; j<pix1.length; j+=4){
			if(result[i][j/4]==0){
				getdata1.data[j] = 255;
				getdata1.data[j+1] = 255;
				getdata1.data[j+2] = 255;
				getdata1.data[j+3] = 255;
			}else{
				getdata1.data[j] = 0;
				getdata1.data[j+1] = 0;
				getdata1.data[j+2] = 0;
				getdata1.data[j+3] = 255;
			}
		}
		ctx.putImageData(getdata1, 0,0);
		var url=canvas.toDataURL('image1/png');
		var a = document.createElement('a')
        var event = new MouseEvent('click')
        a.download = name || 'ttest'
        a.href = url
		a.dispatchEvent(event);*/
		var count = 0;
		for(let n=0;n<result[i].length;n++){
			if(result[i][n]==1){
				count++;
			}
		}
		console.log(count);
	}
	console.log(result);
	return result;
}
function caldistance(a,b){
	var numfea = new Array();
	for(let n=0; n<10; n++){
		numfea[n] = new Array();
	}
	numfea[0] = [100,200,110,110,110,110,110,110,110,110,110,110,110,110,110,1101,10,10,110,110];
	numfea[1] = [1,2,3,4,4,6,6,7,7,7,8,9,3,23,78,21,34,12,0,0];
	numfea[2] = [100,200,110,110,110,110,110,110,110,110,110,110,110,110,110,1101,10,10,110,110];
	numfea[3] = [100,200,110,110,110,110,110,110,110,110,110,110,110,110,110,1101,10,10,110,110];
	numfea[4] = [100,200,110,110,110,110,110,110,110,110,110,110,110,110,110,1101,10,10,110,110];
	numfea[5] = [100,200,110,110,110,110,110,110,110,110,110,110,110,110,110,1101,10,10,110,110];
	numfea[6] = [100,200,110,110,110,110,110,110,110,110,110,110,110,110,110,1101,10,10,110,110];
	numfea[7] = [100,200,110,110,110,110,110,110,110,110,110,110,110,110,110,1101,10,10,110,110];
	numfea[8] = [100,200,110,110,110,110,110,110,110,110,110,110,110,110,110,1101,10,10,110,110];
	numfea[9] = [100,200,110,110,110,110,110,110,110,110,110,110,110,110,110,1101,10,10,110,110];
	var result = 0;
	var sum = 0;
	for(let i =0;i<20;i++){
		sum += (a[i]-numfea[b][i])*(a[i]-numfea[b][i]);
	}
	result = Math.sqrt(sum);
	console.log("dis"+"["+b+"]"+result);
	return result;
}
function recognize(feain){
	var min=0;
	var i = 1;
	for(i =1;i<10;i++){
		if(caldistance(feain,i)<caldistance(feain,min)){
			min = i;
		}
	}
	return min;
}