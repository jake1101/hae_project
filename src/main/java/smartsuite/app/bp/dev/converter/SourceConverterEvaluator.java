package smartsuite.app.bp.dev.converter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SourceConverterEvaluator {

	public static void main(String[] args) {
		
		
		String rootPath = "D:\\dev\\etna_polymer\\eclipse-jee-kepler-SR2-win32-x86_64\\workspace\\standard-common\\"; 
		//String moduleName = "pro";
		//String sourcePath = "C:\\converter8\\LG\\sources\\"+moduleName+"\\";
		//String targetPath = "C:\\converter8\\LG\\targets\\"+moduleName+"\\";
		String sourcePath = "D:\\dev\\etna_polymer\\eclipse-jee-kepler-SR2-win32-x86_64\\workspace\\volcano-webapp\\src\\flex\\modules\\";

		String targetPath = "D:\\dev\\etna_polymer\\eclipse-jee-kepler-SR2-win32-x86_64\\workspace\\volcano-webapp\\src\\ui\\";
		
		
		SourceConvert sc = new SourceConvert();
		List<Map> results = new ArrayList<Map>();
		try {
			results = sc.doConvert(sourcePath, targetPath, rootPath, "html", null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		for(Map result : results){
			System.out.println(result);
		}
	}

}
