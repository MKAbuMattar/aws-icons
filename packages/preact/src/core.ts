import {type FunctionComponent, h, type JSX} from 'preact';

export type AwsIconProps = Omit<
  JSX.SVGAttributes<SVGSVGElement>,
  'dangerouslySetInnerHTML'
> & {
  /** Accessible label. Without it the icon is aria-hidden (decorative). */
  title?: string;
};

export type AwsIconComponent = FunctionComponent<AwsIconProps>;

/** Factory used by the generated icon modules — not meant for direct use. */
export const createAwsIcon = (
  displayName: string,
  attrs: Record<string, string>,
  html: string,
): AwsIconComponent => {
  const Component: AwsIconComponent = ({title, ...props}) =>
    h('svg', {
      ...attrs,
      role: 'img',
      'aria-hidden': title ? undefined : 'true',
      'aria-label': title,
      dangerouslySetInnerHTML: {__html: html},
      ...props,
    });
  Component.displayName = displayName;
  return Component;
};
