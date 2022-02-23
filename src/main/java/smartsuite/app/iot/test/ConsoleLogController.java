package smartsuite.app.iot.test;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import smartsuite.app.common.shared.Const;
import smartsuite.security.annotation.AuthCheck;

@SuppressWarnings({"rawtypes", "unchecked"})
@Controller
@RequestMapping(value="**/iot/test/**/")
public class ConsoleLogController {
	
	@AuthCheck (authCode = Const.READ)
	@RequestMapping(value = "findConsoleLog.do")
	public @ResponseBody Map findConsoleLog(@RequestBody Map param) {
		Map resultMap = new HashMap<String, Object>();
		
		//파일 객체 생성
        Path path = Paths.get("/home/ubuntu/smartiot/log/APIlogs/Api-master.log");
        // 캐릭터셋 지정
        Charset cs = StandardCharsets.UTF_8;
        //파일 내용담을 리스트
        List<String> list = new ArrayList<String>();
        try{
            list = Files.readAllLines(path,cs);
        }catch(IOException e){
            e.printStackTrace();
        }
        
        Integer totalSize = list.size();
        Integer showLineSize = (Integer)param.get("displayLine");
        Integer startLine = 0;
        
        if(totalSize > showLineSize) {
        	startLine = totalSize-showLineSize;
        }
        
        StringBuffer sb = new StringBuffer();
        
        Integer index = 0;
        
        for(String readLine : list){
        	if(index >= startLine) {
        		sb.append(readLine);
            	sb.append("\r\n");
        	}
        	index++;
        }
	
        resultMap.put("text", sb.toString() );
        
        return resultMap;
	}
	
}