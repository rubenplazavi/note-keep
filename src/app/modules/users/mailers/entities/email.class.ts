import { DynamicData, DynamicTemplate } from 'src/config/types/types';

export class Email {
  from: string;
  to: string;
  templateId: string;
  dynamicTemplateData: DynamicData;

  constructor(
    from: string,
    to: string,
    templateId: string,
    dynamicTemplateData: DynamicTemplate,
  ) {
    this.from = from;
    this.to = to;
    this.templateId = templateId;
    this.dynamicTemplateData = dynamicTemplateData;
  }
}
