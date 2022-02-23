package smartsuite.app.bp.admin.board;

public class CoordinatingFromGPS {

	
	// 입력 필요
	public static double[] GF = new double[2];
	// 입력 필요
	public static double[] GR = new double[2];
	// 입력 필요
	public static double[] GE = new double[2];

	// 입력 필요
	public static double[] PF = new double[2];
	// 입력 필요
	public static double[] PR = new double[2];
	
	public static double[] PE = new double[2];
	
	public static double getDistance (double[] p1, double[]p2) {
		return Math.sqrt((p1[0]-p2[0])*(p1[0]-p2[0]) + (p1[1]-p2[1])*(p1[1]-p2[1]));
	}
	
	// 사용전 5개의 변수 입력 해야함. GF, GR , GE, PF, PR
	// 입력 후에 
	// event 의 position 값을 리턴 받는 메소드.
	public static double[] getEventPosition() {
		
		PE= new double[2];
		// 경도 180도,-180도 근방 처리.
		if(GF[1]>0 && GR[1]>0 && GE[1]>0) {
		}else if(GF[1]<0 && GR[1]<0 && GE[1]<0) {
		}else {
			if(GF[1]<0) {GF[1]+=360;}
			if(GR[1]<0) {GR[1]+=360;}
			if(GE[1]<0) {GE[1]+=360;}
		}
		
		
		double[] move_GF = {0,0};
		double[] move_GR = {GR[0]-GF[0],GR[1]-GF[1]};
		double[] move_GE = {GE[0]-GF[0],GE[1]-GF[1]};

		double[] move_PF = {0,0};
		double[] move_PR = {PR[0]-PF[0],PR[1]-PF[1]};
		double[] move_PE = {0,0};
		
		double det_P = getDistance(PF,PR);
		double det_G = getDistance(move_GF,move_GR);
		
		move_GR[0] = move_GR[0]*(1/det_G);
		move_GR[1] = move_GR[1]*(1/det_G);
		move_GE[0] = move_GE[0]*(1/det_G);
		move_GE[1] = move_GE[1]*(1/det_G);
		
		move_PR[0] = move_PR[0]*(1/det_P);
		move_PR[1] = move_PR[1]*(1/det_P);
		
		double cos  = (move_PR[0]/move_GR[1]+move_PR[1]/move_GR[0])/(move_GR[1]/move_GR[0]+move_GR[0]/move_GR[1]);
		double sin =  (move_PR[1]/move_GR[1]-move_PR[0]/move_GR[0])/(move_GR[1]/move_GR[0]+move_GR[0]/move_GR[1]);
		move_PE[0] = cos*move_GE[0]-sin*move_GE[1];
		move_PE[1] = sin*move_GE[0]+cos*move_GE[1];
		
		PE[0] = (move_PE[0])*det_P+PF[0];
		PE[1] = (move_PE[1])*det_P+PF[1];
		
		double det_PE = Math.sqrt(PE[0]*PE[0] + PE[1]*PE[1]);
		PE[0] = PE[0]/det_PE*200;
		PE[1] = PE[1]/det_PE*200;
		
		
		return PE;
	}
	
	
	
	public static void main(String[] args) {
//	
		double[] GF = {30.28431047539311,-178.80232093720724};
		double[] GR = {30.28421047539311,-178.80232092720724};
		double[] GE = {30.28421047539311,178.80232092720724};

		double[] PF= {20,0};
		double[] PR= {-140,0};

		
		
//		double[] GF = {1,0};
//		double[] GR= {2,1};
//		double[] GE= {0,-1};
//		
//		double[] PF= {-1,0};
//		double[] PR= {3,0};
		
		
		double[] PE= new double[2];
		
		// 경도 180도,-180도 근방 처리.
		if(GF[1]>0 && GR[1]>0 && GE[1]>0) {
		}else if(GF[1]<0 && GR[1]<0 && GE[1]<0) {
		}else {
			if(GF[1]<0) {GF[1]+=360;}
			if(GR[1]<0) {GR[1]+=360;}
			if(GE[1]<0) {GE[1]+=360;}
		}
		
		
		
		
		
		
		double[] move_GF = {0,0};
		double[] move_GR = {GR[0]-GF[0],GR[1]-GF[1]};
		double[] move_GE = {GE[0]-GF[0],GE[1]-GF[1]};

		double[] move_PF = {0,0};
		double[] move_PR = {PR[0]-PF[0],PR[1]-PF[1]};
		double[] move_PE = {0,0};
		
		
		
		double det_P = getDistance(PF,PR);
		double det_G = getDistance(move_GF,move_GR);
		move_GR[0] = move_GR[0]*(1/det_G);
		move_GR[1] = move_GR[1]*(1/det_G);
		move_GE[0] = move_GE[0]*(1/det_G);
		move_GE[1] = move_GE[1]*(1/det_G);
		
		move_PR[0] = move_PR[0]*(1/det_P);
		move_PR[1] = move_PR[1]*(1/det_P);
		System.out.println("det_G : "+det_G);
		System.out.println("det_P : "+det_P);
		System.out.println("move_GF : "+ move_GF[0] +"\t"+ move_GF[1]);
		System.out.println("move_GR : "+ move_GR[0] +"\t"+ move_GR[1]);
		System.out.println("move_GE : "+ move_GE[0] +"\t"+ move_GE[1]);
		System.out.println();
		System.out.println("move_PF : "+ move_PF[0] +"\t"+ move_PF[1]);
		System.out.println("move_PR : "+ move_PR[0] +"\t"+ move_PR[1]);
		System.out.println("move_PE : "+ move_PE[0] +"\t"+ move_PE[1]);
		System.out.println("============================================================");
		
		
		
		
		double cos  = (move_PR[0]/move_GR[1]+move_PR[1]/move_GR[0])/(move_GR[1]/move_GR[0]+move_GR[0]/move_GR[1]);
		double sin =  (move_PR[1]/move_GR[1]-move_PR[0]/move_GR[0])/(move_GR[1]/move_GR[0]+move_GR[0]/move_GR[1]);
		System.out.println("sin : "+ sin);
		System.out.println("cos : "+cos);
		System.out.println("sin^2+cos^2 : "+ (sin*sin+cos*cos));
		
		move_PE[0] = cos*move_GE[0]-sin*move_GE[1];
		move_PE[1] = sin*move_GE[0]+cos*move_GE[1];
		
		PE[0] = (move_PE[0])*det_P+PF[0];
		PE[1] = (move_PE[1])*det_P+PF[1];
		double det_PE = Math.sqrt(PE[0]*PE[0] + PE[1]*PE[1]);
		PE[0] = PE[0]/det_PE*200;
		PE[1] = PE[1]/det_PE*200;
		
		System.out.println(det_G);
		System.out.println(det_P);
		System.out.println("move_GF : "+ move_GF[0] +"\t"+ move_GF[1]);
		System.out.println("move_GR : "+ move_GR[0] +"\t"+ move_GR[1]);
		System.out.println("move_GE : "+ move_GE[0] +"\t"+ move_GE[1]);
		System.out.println();
		System.out.println("move_PF : "+ move_PF[0] +"\t"+ move_PF[1]);
		System.out.println("move_PR : "+ move_PR[0] +"\t"+ move_PR[1]);
		System.out.println("move_PE : "+ move_PE[0] +"\t"+ move_PE[1]);
		System.out.println("emergency_pos : " + PE[0] +"\t" +PE[1]);
	}
	
	
}
