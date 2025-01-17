import { KPI } from './types';

export const kpiData: Record<string, KPI> = {
  CB: {
    id: 'CB',
    name: 'การทำงานร่วมกัน [CB]',
    nameEn: 'Collaboration [CB]',
    formula: 'average',
    subKPIs: {
      CB1: {
        name: 'การมีส่วนร่วมในทีม',
        nameEn: 'Team Participation',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ระดับการมีส่วนร่วมในการทำงานกลุ่ม',
        longDescription: 'วัดระดับการมีส่วนร่วมในการทำงานกลุ่ม การแสดงความคิดเห็น และการช่วยเหลือสมาชิกในทีม'
      },
      CB2: {
        name: 'การรับฟังความคิดเห็น',
        nameEn: 'Active Listening',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ความสามารถในการรับฟังความคิดเห็นของผู้อื่น',
        longDescription: 'วัดระดับความสามารถในการรับฟังความคิดเห็นของผู้อื่น การเปิดใจรับฟัง และการนำความคิดเห็นไปปรับใช้'
      }
    }
  },
  CM: {
    id: 'CM',
    name: 'การสื่อสาร [CM]',
    nameEn: 'Communication [CM]',
    formula: 'average',
    subKPIs: {
      CM1: {
        name: 'การสื่อสารที่ชัดเจน',
        nameEn: 'Clear Communication',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ความสามารถในการสื่อสารที่ชัดเจน',
        longDescription: 'วัดระดับความสามารถในการสื่อสารที่ชัดเจน การใช้ภาษาที่เหมาะสม และการนำเสนอข้อมูลที่ชัดเจน'
      },
      CM2: {
        name: 'การนำเสนอข้อมูล',
        nameEn: 'Information Presentation',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ความสามารถในการนำเสนอข้อมูล',
        longDescription: 'วัดระดับความสามารถในการนำเสนอข้อมูล การจัดเตรียมข้อมูลที่ชัดเจน และการนำเสนอข้อมูลที่น่าสนใจ'
      }
    }
  },
  IQ: {
    id: 'IQ',
    name: 'การสืบค้น [IQ]',
    nameEn: 'Inquiry [IQ]',
    formula: 'average',
    subKPIs: {
      IQ1: {
        name: 'การตั้งคำถาม',
        nameEn: 'Questioning',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ความสามารถในการตั้งคำถาม',
        longDescription: 'วัดระดับความสามารถในการตั้งคำถาม การคิดอย่างมีวิจารณญาณ และการค้นหาคำตอบ'
      },
      IQ2: {
        name: 'การค้นคว้าข้อมูล',
        nameEn: 'Research Skills',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ความสามารถในการค้นคว้าข้อมูล',
        longDescription: 'วัดระดับความสามารถในการค้นคว้าข้อมูล การใช้แหล่งข้อมูลที่เชื่อถือได้ และการวิเคราะห์ข้อมูล'
      }
    }
  },
  RS: {
    id: 'RS',
    name: 'ความยืดหยุ่น [RS]',
    nameEn: 'Resilience [RS]',
    formula: 'average',
    subKPIs: {
      RS1: {
        name: 'การปรับตัวต่อการเปลี่ยนแปลง',
        nameEn: 'Adaptability',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ความสามารถในการปรับตัวต่อการเปลี่ยนแปลง',
        longDescription: 'วัดระดับความสามารถในการปรับตัวต่อการเปลี่ยนแปลง การยอมรับการเปลี่ยนแปลง และการปรับแผนการทำงาน'
      },
      RS2: {
        name: 'การจัดการความท้าทาย',
        nameEn: 'Challenge Management',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ความสามารถในการจัดการความท้าทาย',
        longDescription: 'วัดระดับความสามารถในการจัดการความท้าทาย การวิเคราะห์ความท้าทาย และการหาวิธีแก้ไข'
      }
    }
  },
  PS: {
    id: 'PS',
    name: 'การแก้ปัญหา [PS]',
    nameEn: 'Problem Solving [PS]',
    formula: 'average',
    subKPIs: {
      PS1: {
        name: 'การวิเคราะห์ปัญหา',
        nameEn: 'Problem Analysis',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ความสามารถในการวิเคราะห์ปัญหา',
        longDescription: 'วัดระดับความสามารถในการวิเคราะห์ปัญหา การระบุปัญหา และการหาวิธีแก้ไข'
      },
      PS2: {
        name: 'การหาวิธีแก้ปัญหา',
        nameEn: 'Solution Finding',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ความสามารถในการหาวิธีแก้ปัญหา',
        longDescription: 'วัดระดับความสามารถในการหาวิธีแก้ปัญหา การคิดอย่างมีวิจารณญาณ และการนำวิธีแก้ปัญหาไปใช้'
      }
    }
  },
  CT: {
    id: 'CT',
    name: 'ความคิดสร้างสรรค์ [CT]',
    nameEn: 'Creativity [CT]',
    formula: 'average',
    subKPIs: {
      CT1: {
        name: 'การคิดริเริ่ม',
        nameEn: 'Original Thinking',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ความสามารถในการคิดริเริ่ม',
        longDescription: 'วัดระดับความสามารถในการคิดริเริ่ม การคิดนอกกรอบ และการนำเสนอความคิดใหม่'
      },
      CT2: {
        name: 'การสร้างนวัตกรรม',
        nameEn: 'Innovation',
        min: 1,
        max: 5,
        formula: 'average',
        shortDescription: 'ความสามารถในการสร้างนวัตกรรม',
        longDescription: 'วัดระดับความสามารถในการสร้างนวัตกรรม การนำเทคโนโลยีใหม่มาใช้ และการปรับปรุงกระบวนการทำงาน'
      }
    }
  }
};