interface GameObject {
    function onUpdate(): void;
    function onLoad(): void;
}

export { GameObject };