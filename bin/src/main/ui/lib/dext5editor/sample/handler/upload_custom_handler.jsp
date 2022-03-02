﻿<%@ page import="com.dext5.DEXT5Handler" %><% 
	String handler_version = "3.5.1055089.1927.01";
	String _allowFileExt = "gif, jpg, jpeg, png, bmp, wmv, asf, swf, avi, mpg, mpeg, mp4, txt, doc, docx, xls, xlsx, ppt, pptx, hwp, zip, pdf";
	int upload_max_size = 2147483647;

	DEXT5Handler DEXT5 = new DEXT5Handler();
	String result = DEXT5.DEXTProcess(request, response, application, _allowFileExt, upload_max_size);

	// 다음과 같이 서버측 API를 사용하실 수 있습니다.
    String _LastSaveFile = DEXT5.LastSaveFile();
    String _LastSaveUrl = DEXT5.LastSaveUrl();

	if(DEXT5.IsImageUpload()) {
		/*
		// 동일 폴더에 이미지 썸네일 생성하기
		String strSourceFile = DEXT5.LastSaveFile();
		int rtn_value = DEXT5.ImageThumbnail(strSourceFile, "_thumb", 600, 0);
		if (rtn_value != 0) {
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/
		
		/*
		// 썸네일 파일 생성
		String strSourceFile = DEXT5.LastSaveFile();
		String strNewFileName = strSourceFile.replaceAll("\\\\image\\\\", "\\thumbnail\\");
		int rtn_value = DEXT5.GetImageThumbOrNewEx(strSourceFile, strNewFileName, 200, 0, 0);
		if (rtn_value != 0)
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/
		
		/*
		// 이미지 포멧 변경
		String strSourceFile = DEXT5.LastSaveFile();
		int rtn_value = DEXT5.ImageConvertFormat(strSourceFile, "png", 0);
		if (rtn_value != 0)
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/
		
		/*
		// 이미지 크기 변환
		String strSourceFile = DEXT5.LastSaveFile();
		int rtn_value = DEXT5.ImageConvertSize(strSourceFile, 500, 30);
		if (rtn_value != 0)
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/
		
		/*
		// 비율로 이미지 크기 변환
		String strSourceFile = DEXT5.LastSaveFile();
		int rtn_value = DEXT5.ImageConvertSizeByPercent(strSourceFile, 50);
		if (rtn_value != 0)
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/
		
		/*
		// 비율로 이미지 크기 변환
		String strSourceFile = DEXT5.LastSaveFile();
		int rtn_value = DEXT5.ImageConvertSizeByPercent(strSourceFile, 50);
		if (rtn_value != 0)
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/
		
		/*
		// 이미지 회전
		String strSourceFile = DEXT5.LastSaveFile();
		int rtn_value = DEXT5.ImageRotate(strSourceFile, 90);
		if (rtn_value != 0)
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/
		
		/*
		// 이미지 워터마크
		String strSourceFile = DEXT5.LastSaveFile();
		String strWaterMarkFile = "C:\\Temp\\watermark.jpg";
		int rtn_value = DEXT5.ImageWaterMark(strSourceFile, strWaterMarkFile, "TOP", 10, "RIGHT", 10, 0);
		if (rtn_value != 0)
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/

		/*
		// 텍스트 워터마크
		String strSourceFile = DEXT5.LastSaveFile();
		DEXT5.SetFontInfo("굴림", 50, "FF00FF");
		int rtn_value = DEXT5.TextWaterMark(strSourceFile, "DEXT5", "TOP", 10, "CENTER", 10, 0, 45);
		if (rtn_value != 0)
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/
        
        /*
		// 다른 파일명.확장자 
		String strSourceFile = DEXT5.LastSaveFile();
        String rtn_value = DEXT5.GetNewFileNameEx("jpg", "TIME");
		if (rtn_value.equals(""))
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
        */
        
        /*
        // 이미지 가로(Width) 크기
        String strSourceFile = DEXT5.LastSaveFile();
        int rtn_value = DEXT5.GetImageWidth(strSourceFile);
        if (rtn_value <= 0)
        {
            String strLastError = DEXT5.LastErrorMessage();
        }
        */
		
		/*
		// 이미지 세로(Height) 크기
		String strSourceFile = DEXT5.LastSaveFile();
		int rtn_value = DEXT5.GetImageHeight(strSourceFile);
		if (rtn_value <= 0)
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/

		/*
		// 이미지 Format 정보
		String strSourceFile = DEXT5.LastSaveFile();
		String rtn_value = DEXT5.GetImageFormat(strSourceFile);
		if (rtn_value == "")
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/
		
		/*
		// 이미지 파일 크기
		String strSourceFile = DEXT5.LastSaveFile();
		long rtn_value = DEXT5.GetImageFileSize(strSourceFile);
		if (rtn_value <= 0)
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/
		
		/*
		// 파일 삭제
		String strSourceFile = DEXT5.LastSaveFile();
		int rtn_value = DEXT5.DeleteFile(strSourceFile);
		if (rtn_value != 0)
		{
			String strLastError = DEXT5.LastErrorMessage();
		}
		*/
	}

	// 파일 저장 경로 (물리적 경로)
	//if(dext5.LastSaveFile().length() > 0) { 
	//	System.out.println("save file : [" + dext5.LastSaveFile() + "]");
	//}

	// 파일 저장 경로 (WEB URL)
	//if(dext5.LastSaveUrl().length() > 0) { 
	//System.out.println("save url : [" + dext5.LastSaveUrl() + "]");
	//}

	// 에러 Message 
	//if(dext5.LastErrorMessage().length() > 0) { 
	//	System.out.println("DEXT5 Handler Error : [" + dext5.LastErrorMessage() + "]");
	//}

	if(!result.equals("")) {
		out.print(result);
	} else {
		out.clear();
	}
%>