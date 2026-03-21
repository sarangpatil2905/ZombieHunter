import type { LucideIcon } from "lucide-react";
import React from "react";

type PrismProps = {
    length: number;
    bradius: number;
    height: number;
    width: number;
    topColor?: string;
    bottomColor?: string;
    sideColor?: string;
    isActive?: boolean;
    icon?: LucideIcon;
};

const Prism: React.FC<PrismProps> = ({
    length,
    height,
    isActive,
    width,
    bradius,
    icon,
    topColor = "#5c22a6cc",
    sideColor = "#c92525",
}) => {

    const sideLength = Math.max(length, width, height);

    const panelAngle = 90 / 20; // smoother curve
    const steps = 20;

    return (
        <div style={{
            perspective: "1000px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
        }}>
            <div style={{
                position: "relative",
                width: sideLength,
                height: sideLength,
                transformStyle: "preserve-3d",
                transform: "rotateX(-30deg) rotateY(45deg)",
            }}>
                <div className="p-2"
                    style={{
                        position: "absolute",
                        width: length,
                        height: width,
                        background: topColor,
                        border: `2px solid ${sideColor}`,
                        borderRadius: bradius,
                        transform: `
    translateY(${-height / 2}px)
    translateX(${length < width ? -(length - width) / 2 : 0}px)
    translateZ(${length > width ? -(width - length) / 2 : 0}px)
    rotateX(90deg)
`
                    }} >
                    <div className={`${isActive ? "bg-[#EAF4FF] border-[#8AAFF2]" : "bg-[#eee]"} w-[90%] h-full rounded-xl border-2`}>
                        <div className="relative text-[150px] rotate-90 top-40 font-bold text-[#8aaff2] font-serif">
                            <div
                                className={`w-full h-full  flex items-center justify-center ${isActive
                                    ? "bg-[#EAF4FF] "
                                    : "bg-[#eee]"
                                    }`}
                            >
                                {icon &&
                                    (() => {
                                        const Icon = icon;
                                        return (
                                            <Icon
                                                size={80}
                                                color={isActive ? sideColor : "#9ca3af"}
                                                opacity={isActive ? 1 : .1}

                                            />
                                        );
                                    })()}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom */}
                <div style={{
                    position: "absolute",
                    width: length,
                    height: width,
                    background: sideColor,
                    border: `2px solid ${sideColor}`,
                    borderRadius: bradius,
                    transform: `
    translateY(${height / 2}px)
    translateX(${length < width ? -(length - width) / 2 : 0}px)
    translateZ(${length > width ? -(width - length) / 2 : 0}px)
    rotateX(90deg)
`
                }} />

                {/* SIDE FACES */}
                {[0, 1, 2, 3].map((i) => {
                    const isLength = i % 2 === 0;
                    const w = isLength ? length : width;
                    const z = isLength ? width / 2 : length / 2;

                    return (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: w,
                                height: height,
                                marginLeft: -w / 2,

                                transform: `
                                    rotateY(${i * 90}deg)
                                    translateZ(${z}px)
                                    translateY(${-height / 2 - 1}px)
                                `,
                            }}
                        >
                            <div
                                key={i}
                                style={{
                                    alignSelf: "center",
                                    justifySelf: "center",
                                    width: w - bradius * 2,
                                    height: height,
                                    background: sideColor,
                                    border: `2px solid ${isActive ? "#6193ED" : "#aaa"}`,
                                    zIndex: 100
                                }}
                            />

                        </div>
                    );
                })}

                {/* ✅ QUARTER CYLINDER */}
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transformStyle: "preserve-3d",
                    transform: `
                        translateX(${length / 2 - bradius}px)
                            translateZ(${-width / 2 + bradius}px)
                            translateX(-2px)
                            `,
                }}>
                    {Array.from({ length: steps }).map((_, i) => {
                        const angle = i * panelAngle + 90;

                        const panelWidth =
                            2 * bradius * Math.sin(Math.PI / (2 * steps));

                        return (
                            <div
                                key={i}
                                style={{
                                    position: "absolute",
                                    width: panelWidth,
                                    height: height,
                                    background: sideColor,
                                    transformOrigin: "center",
                                    transform: `
                                        rotateY(${angle}deg)
                                        
                                        translateZ(${bradius}px)
                                        translateY(${-height / 2}px)
                                    `,
                                }}
                            />
                        );
                    })}
                </div>
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transformStyle: "preserve-3d",
                    transform: `
                        translateX(${length / 2 - bradius}px)
                            translateZ(${width / 2 - bradius
                        }px)
                translateX(-2px)
                `,
                }}>
                    {Array.from({ length: steps }).map((_, i) => {
                        const angle = i * panelAngle;

                        const panelWidth =
                            2 * bradius * Math.sin(Math.PI / (2 * steps));

                        return (
                            <div
                                key={i}
                                style={{
                                    position: "absolute",
                                    width: panelWidth,
                                    height: height,
                                    background: sideColor,
                                    transformOrigin: "center",
                                    transform: `
                                        rotateY(${angle}deg)
                                        translateZ(${bradius}px)
                                        translateY(${-height / 2}px)
                                    `,
                                }}
                            />
                        );
                    })}
                </div>
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transformStyle: "preserve-3d",
                    transform: `
                        translateX(${-length / 2 + bradius}px)
                            translateZ(${-width / 2 + bradius
                        }px)
                translateX(-2px)
                `,
                }}>
                    {Array.from({ length: steps }).map((_, i) => {
                        const angle = i * panelAngle + 180;

                        const panelWidth =
                            2 * bradius * Math.sin(Math.PI / (2 * steps));

                        return (
                            <div
                                key={i}
                                style={{
                                    position: "absolute",
                                    width: panelWidth,
                                    height: height,
                                    background: sideColor,
                                    transformOrigin: "center",
                                    transform: `
                                        rotateY(${angle}deg)
                                        translateZ(${bradius}px)
                                        translateY(${-height / 2}px)
                                    `,
                                }}
                            />
                        );
                    })}
                </div>
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transformStyle: "preserve-3d",
                    transform: `
                        translateX(${-length / 2 + bradius}px)
                            translateZ(${width / 2 - bradius - 1
                        }px)
                translateX(-1px)
                `,
                }}>
                    {Array.from({ length: steps }).map((_, i) => {
                        const angle = i * panelAngle + 270;

                        const panelWidth =
                            2 * bradius * Math.sin(Math.PI / (2 * steps));

                        return (
                            <div
                                key={i}
                                style={{
                                    position: "absolute",
                                    width: panelWidth,
                                    height: height,
                                    background: sideColor,
                                    transformOrigin: "center",
                                    transform: `
                    rotateY(${angle}deg)
                    translateZ(${bradius}px)
                    translateY(${-height / 2}px)
                    `,
                                }}
                            />
                        );
                    })}
                </div>

            </div>
        </div >
    );
};

export default Prism;