export function treeMaker (
    data,
    {
        pidKey = 'parentId',
        idKey = 'id',
        childrenKey = 'children',
        rootCondition = node => (node[pidKey] == null || node[pidKey] == 0 || node[pidKey] == undefined)
    } = {}
) {
    let [rootNodes, restNodes] = pickRootNodes(data,idKey, rootCondition);
    let [ dealedNodes, nextParent, nextRest ] = combineNodes(rootNodes, restNodes, idKey, pidKey, childrenKey);
    let nodes = [...dealedNodes];
    while(nextParent.length && nextRest.length) {
        [ dealedNodes, nextParent, nextRest ] = combineNodes(nextParent, nextRest, idKey, pidKey, childrenKey);
    }

    return nodes;
}

function pickRootNodes(nodes,idKey,rootCondition) {
    return nodes.reduce((acc, n) => {
        n.key=n[idKey];
        let [root, rest] = acc;
        if (rootCondition(n))
            root = [ ...root, n ];
        else
            rest = [ ...rest, n ];

        return [root, rest];
    }, [[], []]);
}

function pickChildren (rootNode, restNodes, idKey, pidKey) {
    const pid = rootNode[idKey];
    return restNodes.reduce((acc, n) => {
        let [children, rest] = acc;
        if (pid == n[pidKey])
            children = [ ...children, n ];
        else
            rest = [ ...rest, n ];

        return [children, rest];
    }, [[], []]);
}

function combineNode (node, children, childrenKey) {
    if (children.length)
        node[childrenKey] = [...children];
    return node;
}

function combineNodes(parentNodes, restNodes, idKey, pidKey, childrenKey) {
    return parentNodes.reduce((acc, n) => {
        const [lastCombined, lastChildren, lastRest] = acc;
        const [children, rest] = pickChildren(n, lastRest, idKey, pidKey);
        return [
            [...lastCombined, combineNode(n, children, childrenKey)],
            [...lastChildren, ...children],
            [...rest]
        ];
    },[[], [], restNodes]);
}

export function getAllIds (nodes) {
    return nodes.reduce((acc, n) => {
        let ids = [...acc, n.id];
        if (n.children && n.children.length)
            ids = ids.concat(getAllIds(n.children));
        return ids;
    }, []);
}