import {type JSXOutput, jsx} from '@builder.io/qwik';

export type AwsIconProps = Record<string, unknown> & {
  /** Accessible label. Without it the icon is aria-hidden (decorative). */
  title?: string;
};

export type AwsIconComponent = (props?: AwsIconProps) => JSXOutput;

/** Factory used by the generated icon modules — not meant for direct use. */
export const createAwsIcon = (
  name: string,
  attrs: Record<string, string>,
  html: string,
): AwsIconComponent => {
  return (props = {}) => {
    const {title, ...rest} = props;
    return jsx('svg', {
      ...attrs,
      role: 'img',
      'aria-hidden': title ? undefined : 'true',
      'aria-label': title as string | undefined,
      dangerouslySetInnerHTML: html,
      ...rest,
    });
  };
};
