import {createElement, forwardRef, type SVGProps} from 'react';

export type AwsIconProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'dangerouslySetInnerHTML'
> & {
  /** Accessible label. Without it the icon is aria-hidden (decorative). */
  title?: string;
};

export type AwsIconComponent = React.ForwardRefExoticComponent<
  AwsIconProps & React.RefAttributes<SVGSVGElement>
>;

/** Factory used by the generated icon modules — not meant for direct use. */
export const createAwsIcon = (
  displayName: string,
  attrs: Record<string, string>,
  html: string,
): AwsIconComponent => {
  const Component = forwardRef<SVGSVGElement, AwsIconProps>(
    ({title, ...props}, ref) =>
      createElement('svg', {
        ...attrs,
        role: 'img',
        'aria-hidden': title ? undefined : true,
        'aria-label': title,
        ref,
        dangerouslySetInnerHTML: {__html: html},
        ...props,
      }),
  );
  Component.displayName = displayName;
  return Component;
};
