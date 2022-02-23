package smartsuite.app.common.attach;

import java.io.InputStream;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.common.base.Function;
import com.google.common.collect.Lists;

import smartsuite.upload.core.encryption.FileItemEncryptor;
import smartsuite.upload.core.entity.FileDto;
import smartsuite.upload.core.entity.FileItem;
import smartsuite.upload.core.entity.FileList;
import smartsuite.upload.core.factory.FileDtoFactory;
import smartsuite.upload.core.service.FileService;
import smartsuite.upload.core.util.MIMETypeUtil;
import smartsuite.upload.spring.web.bind.annotation.FileIdParam;

@RequestMapping(value={"**/viewer/**/"})
@Controller
public class AttachViewerController {

	@Inject
	FileService fileService;
	
	@Inject
	MIMETypeUtil mimeTypeUtil;
	
	@Inject
	FileDtoFactory fileDtoFactory;
	
	@Inject
	FileItemEncryptor encryptor;
	
	@RequestMapping(value="list.do", method = RequestMethod.POST)
	public @ResponseBody List<FileDto> list(@FileIdParam(value="groupId", decrypt=false) String groupId) {
		FileList fileList = fileService.findListWithoutContents(groupId);
		return Lists.transform(fileList.getItems(), new Function<FileItem, FileDto>() {
			@Override
			public FileDto apply(FileItem input) {
				return fileDtoFactory.create(input);
			}
		});
	}
	
	@RequestMapping(value = "videoviewer.do", method = RequestMethod.GET)
	public ResponseEntity<byte[]> getImageAsResponseEntity(@FileIdParam(value="id", decrypt=true) String id, HttpServletRequest request) throws Exception {
	    FileItem fileItem = fileService.findDownloadItem(id);
	    HttpHeaders headers = new HttpHeaders();
	    InputStream io = FileUtils.openInputStream(fileItem.getFile());
	    byte[] media = IOUtils.toByteArray(io);
	    ResponseEntity<byte[]> responseEntity = new ResponseEntity<byte[]>(media, headers, HttpStatus.OK);
	    return responseEntity;
	}
}
